import { EKeyCode, EKeyState, KeyManager } from "../manager/KeyManager.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class PlayerInput extends Component
{
    Update(): void {
        if(KeyManager.instance.GetKeyState(EKeyCode.Q) === EKeyState.TAP)
        {
            console.log("hi im t");
        }
        if(KeyManager.instance.GetKeyState(EKeyCode.Q) === EKeyState.HOLD)
        {
            console.log("hi im t holding");
        }
    }
}
  