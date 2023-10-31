import { GameObject } from "../gameobject/GameObject.js";
import { Scene } from "./Scene.js";

export class MainScene extends Scene
{
    Enter(): void 
    {
        const obj = new GameObject();
        
    }
    Exit(): void 
    {
        throw new Error("Method not implemented.");
    }
    
} 