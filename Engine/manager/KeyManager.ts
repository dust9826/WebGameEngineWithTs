import { Logger } from "../Logger.js";
import { Manager } from "./Manager.js";

export class KeyManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: KeyManager;
    public static get instance() 
    {
      if(!KeyManager._instance)
      {
        KeyManager._instance = new KeyManager();
      }
      return KeyManager._instance;
    }
    private constructor() 
    {
      super();
      this.arrKeys = new Map<string, KeyInfo>();
      this.arrKeyEvents = new Map<string, boolean>();
    }

    private arrKeys: Map<string, KeyInfo>
    private arrKeyEvents: Map<string, boolean>

    init() 
    {
        for (let key in EKeyCode) 
        {
            this.arrKeys[EKeyCode[key]] = new KeyInfo();
            this.arrKeyEvents[EKeyCode[key]] = false;
        }
        // 윈도우 이벤트와 연결
        window.onkeydown = this.OnKeyDown;
        window.onkeyup = this.OnKeyUp;
    }
    
    update() 
    {
        console.log(this.arrKeyEvents);
        console.log(this.arrKeys);
        for(let key in EKeyCode)
        {
            const code = EKeyCode[key];
            const keyInfo: KeyInfo = this.arrKeys[code];
            
            if(this.arrKeyEvents[code])
            {
                if(keyInfo.prevPush)
                {
                    keyInfo.keyState = EKeyState.HOLD;
                }
                else
                {
                    keyInfo.keyState = EKeyState.TAP;
                }
                keyInfo.prevPush = true;
            }
            else
            {
                if(keyInfo.prevPush)
                {
                    keyInfo.keyState = EKeyState.AWAY;
                }
                else
                {
                    keyInfo.keyState = EKeyState.NONE;
                }
                keyInfo.prevPush = false;
            }
        }
    }

    OnKeyDown(e)
    {
        const code: string = e.code;
        const arrKeys: Map<string, boolean> = KeyManager.instance.arrKeyEvents;

        if(code === EKeyCode.TAB)
        {
            e.preventDefault();
        }

        // 키 배열 갱신
        if(arrKeys[code] !== undefined)
        {
            arrKeys[code] = true;
        }
    }
    
    OnKeyUp(e)
    {
        const code: string = e.code;
        const arrKeys: Map<string, boolean> = KeyManager.instance.arrKeyEvents;

        // 키 배열 갱신
        if(arrKeys[code] !== undefined)
        {
            arrKeys[code] = false;
        }
    }
} 

class KeyInfo
{
    constructor()
    {
        this.keyState = EKeyState.AWAY;
        this.prevPush = false;
    }
    keyState: EKeyState;
    prevPush: boolean;
}

const EKeyState = 
{
    NONE: 0,
    TAP: 1,
    HOLD: 2,
    AWAY: 3,
} as const;
type EKeyState = typeof EKeyState[keyof typeof EKeyState];

const EKeyCode = 
{
    Q: 'KeyQ',
    W: 'KeyW',
    E: 'KeyE',
    TAB: 'Tab'
} as const;
type EKeyCode = typeof EKeyCode[keyof typeof EKeyCode];