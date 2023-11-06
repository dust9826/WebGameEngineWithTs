import { Core } from "../Core.js";
import { PlayerInput } from "../component/PlayerInput.js";
import { ECreateObject, InstantiateBox } from "../func.js";
import { GroupType, GameObject } from "../gameobject/GameObject.js";
import { RendererManager } from "../manager/RendererManager.js";
import { SimpleRenderer } from "../renderer/SimpleRenderer.js";
import { Scene } from "./Scene.js";

export class MainScene extends Scene
{
    Enter(): void 
    {
        this.initRenderer();
        console.log(1);
        const obj = InstantiateBox();
        ECreateObject(obj, GroupType.PLAYER);
        obj.AddComponent(new PlayerInput(), PlayerInput);
        obj.SetRenderer(RendererManager.instance.FindRenderer(SimpleRenderer));
    }
    
    Exit(): void 
    {
        
    }
    
    initRenderer()
    {
        const gl = Core.instance.gl;
        RendererManager.instance.CreateRenderer(gl, SimpleRenderer);
    }
} 