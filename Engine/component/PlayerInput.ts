import { DT, KeyHold } from "../func.js";
import { KeyCode, KeyState, KeyManager } from "../manager/KeyManager.js";
import { SceneManager } from "../manager/SceneManager.js";
import { Matrix4x4, Vec2, Vec3 } from "../struct.js";
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
        const dir: Vec3 = Vec3.zero();
        
        if(KeyHold(KeyCode.W))
        {
            dir.z += 1;
        }
        if(KeyHold(KeyCode.S))
        {
            dir.z -= 1;
        }
        if(KeyHold(KeyCode.A))
        {
            dir.x -= 1;
        }
        if(KeyHold(KeyCode.D))
        {
            dir.x += 1;
        }

        this.cameraTransform(dir);

        const mouseMovement = KeyManager.instance.GetMouseMovement();
        mouseMovement.mul(0.1);
        
        cameraTransform.rotation.sum(new Vec3([mouseMovement.y, mouseMovement.x, 0]));
    }

    cameraTransform(dir: Vec3)
    {
        const cameraTransform = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Transform);
        const rotateM = Matrix4x4.rotationV(cameraTransform.rotation.v);
        dir.mul4x4(rotateM);
        console.log(dir.v);
        cameraTransform.position.sum(dir.mul(DT() * 0.01));
    }
}
  