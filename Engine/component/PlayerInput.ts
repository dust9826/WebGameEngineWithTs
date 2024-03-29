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
        //const cameraTransform = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Transform);
        const dir: Vec3 = Vec3.zero();
        
        if(KeyHold(KeyCode.W))
        {
            dir.y += 1;
        }
        if(KeyHold(KeyCode.S))
        {
            dir.y -= 1;
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
            dir.z -= 1;
        }
        if(KeyHold(KeyCode.SPACE))
        {
            dir.z += 1;
        }

        transform.position.sum(dir);
    }

}
  