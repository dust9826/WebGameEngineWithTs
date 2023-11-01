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
        for (let key in KeyCode) 
        {
            this.arrKeys[KeyCode[key]] = new KeyInfo();
            this.arrKeyEvents[KeyCode[key]] = false;
        }
        // 윈도우 이벤트와 연결
        window.onkeydown = this.OnKeyDown;
        window.onkeyup = this.OnKeyUp;
    }
    
    update() 
    {
        for(let key in KeyCode)
        {
            const code = KeyCode[key];
            const keyInfo: KeyInfo = this.arrKeys[code];
            
            if(this.arrKeyEvents[code])
            {
                if(keyInfo.prevPush)
                {
                    keyInfo.keyState = KeyState.HOLD;
                }
                else
                {
                    keyInfo.keyState = KeyState.TAP;
                }
                keyInfo.prevPush = true;
            }
            else
            {
                if(keyInfo.prevPush)
                {
                    keyInfo.keyState = KeyState.AWAY;
                }
                else
                {
                    keyInfo.keyState = KeyState.NONE;
                }
                keyInfo.prevPush = false;
            }
        }
    }

    GetKeyState(keyCode: KeyCode)
    {
        return this.arrKeys[keyCode].keyState;
    }

    OnKeyDown(e)
    {
        const code: string = e.code;
        const arrKeys: Map<string, boolean> = KeyManager.instance.arrKeyEvents;

        if(code === KeyCode.TAB)
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
        this.keyState = KeyState.AWAY;
        this.prevPush = false;
    }
    keyState: KeyState;
    prevPush: boolean;
}

export const KeyState = 
{
    NONE: 0,
    TAP: 1,
    HOLD: 2,
    AWAY: 3,
} as const;
export type KeyState = typeof KeyState[keyof typeof KeyState];

export const KeyCode = 
{
    Q: 'KeyQ',
    W: 'KeyW',
    E: 'KeyE',
    TAB: 'Tab'
} as const;
export type KeyCode = typeof KeyCode[keyof typeof KeyCode];