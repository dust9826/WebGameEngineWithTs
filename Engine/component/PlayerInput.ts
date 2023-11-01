import { KeyCode, KeyState, KeyManager } from "../manager/KeyManager.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class PlayerInput extends Component
{
    Update(): void {
        if(KeyManager.instance.GetKeyState(KeyCode.Q) === KeyState.TAP)
        {
            console.log("hi im t");
        }
        if(KeyManager.instance.GetKeyState(KeyCode.Q) === KeyState.HOLD)
        {
            console.log("hi im t holding");
        }
    }
}
  