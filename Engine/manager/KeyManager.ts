import { Core } from "../Core.js";
import { Vec2 } from "../struct.js";
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
      this.mouseMovement = Vec2.zero();
      this.mouseMovementAcc = Vec2.zero();
      this.mousePosition = Vec2.zero();
    }

    private arrKeys: Map<string, KeyInfo>
    private arrKeyEvents: Map<string, boolean>
    private mouseMovement: Vec2;
    private mouseMovementAcc: Vec2;
    private mousePosition: Vec2;

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
        window.onmousemove = this.OnMouseMove;
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
        
        this.mouseMovement.set(this.mouseMovementAcc.v);
        this.mouseMovementAcc.set([0, 0]);
    }

    GetKeyState(keyCode: KeyCode)
    {
        return this.arrKeys[keyCode].keyState;
    }

    public GetMouseMovement(): Vec2
    {
        return this.mouseMovement;
    }

    public SetMouseMiddle()
    {
        const gl = Core.instance.gl;
        this.mousePosition = new Vec2([gl.canvas.width, gl.canvas.height]).mul(0.5);
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

    OnMouseMove(e)
    {
        const mouseMovementAcc = KeyManager.instance.mouseMovementAcc;
        mouseMovementAcc.x += e.movementX;
        mouseMovementAcc.y += e.movementY;
    }

    OnMouseDown(e)
    {
        console.log(e)
    }

    OnMouseUp(e)
    {
        console.log(e)
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
    R: 'KeyR',
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD',
    F: 'KeyF',
    TAB: 'Tab'
} as const;
export type KeyCode = typeof KeyCode[keyof typeof KeyCode];