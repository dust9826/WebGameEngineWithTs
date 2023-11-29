import { DT, DegreeToRadians, KeyHold } from "../func.js";
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
        if(KeyHold(KeyCode.LSHIFT))
        {
            dir.y -= 1;
        }
        if(KeyHold(KeyCode.SPACE))
        {
            dir.y += 1;
        }

        //cameraTransform.position.sum(dir);

        this.cameraTransform(dir);

        const mouseMovement = KeyManager.instance.GetMouseMovement();
        mouseMovement.mul(0.1);
        
        cameraTransform.rotation.sum(new Vec3([mouseMovement.y, mouseMovement.x, 0]));
    }

    cameraTransform(dir: Vec3)
    {
        const cameraTransform = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Transform);
        const y = DegreeToRadians(cameraTransform.rotation.y);
        const c = Math.cos(y);
        const s = Math.sin(y);
        const m = new Vec3([c * dir.x + s * dir.z, dir.y, - s * dir.x + c * dir.z ]);
        cameraTransform.position.sum(m.mul(DT() * 0.01));
    }
}
  