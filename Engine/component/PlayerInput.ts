import { KeyHold } from "../func.js";
import { KeyCode, KeyState, KeyManager } from "../manager/KeyManager.js";
import { SceneManager } from "../manager/SceneManager.js";
import { Matrix4x4, Vec3 } from "../struct.js";
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

        const mouseMovement = KeyManager.instance.GetMouseMovement();
        mouseMovement.mul(0.1);
        transform.rotation.sum(new Vec3([mouseMovement.x, mouseMovement.y]));
        //cameraTransform.rotation.sum(new Vec3([mouseMovement.y, mouseMovement.x, 0]));
        console.log(transform.rotation.v);
    }
}
  