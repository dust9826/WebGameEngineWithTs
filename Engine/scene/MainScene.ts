import { PlayerInput } from "../component/PlayerInput.js";
import { ECreateObject } from "../func.js";
import { GroupType, GameObject } from "../gameobject/GameObject.js";
import { Scene } from "./Scene.js";

export class MainScene extends Scene
{
    Enter(): void 
    {
        console.log(1);
        const obj = new GameObject();
        ECreateObject(obj, GroupType.PLAYER);
        obj.AddComponent(new PlayerInput(), PlayerInput);
    }
    Exit(): void 
    {
        
    }
    
} 