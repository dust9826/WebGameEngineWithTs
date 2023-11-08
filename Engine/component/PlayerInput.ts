import { KeyHold } from "../func.js";
import { KeyCode, KeyState, KeyManager } from "../manager/KeyManager.js";
import { SceneManager } from "../manager/SceneManager.js";
import { Component } from "./Component.js";
import { Transform } from "./Transform.js";

/**
 * 
 */
export class PlayerInput extends Component
{
    Update(): void {
        const transform = this.gameobject.GetComponent(Transform);
        const cameraTransform = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Transform);
        if(KeyHold(KeyCode.Q))
        {
            cameraTransform.position.z -= 0.05;
        }
        if(KeyHold(KeyCode.W))
        {
            cameraTransform.position.z += 0.05;
        }
        if(KeyHold(KeyCode.A))
        {
            transform.rotation.z += 0.5;
        }
        if(KeyHold(KeyCode.S))
        {
            transform.rotation.z -= 0.5;
        }
        if(KeyHold(KeyCode.E))
        {
            transform.scale.x -= 1;
        }
        if(KeyHold(KeyCode.R))
        {
            transform.scale.x += 1;
        }
    }
}
  