import { PlayerInput } from "../component/PlayerInput.js";
import { EObjectType, GameObject } from "../gameobject/GameObject.js";
import { Scene } from "./Scene.js";

export class MainScene extends Scene
{
    Enter(): void 
    {
        console.log(1);
        const obj = new GameObject();
        this.AddObject(obj, EObjectType.PLAYER);
        obj.AddComponent(new PlayerInput(), PlayerInput);
    }
    Exit(): void 
    {
        
    }
    
} 