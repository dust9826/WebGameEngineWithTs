import { Core } from "../Core.js";
import { PlayerInput } from "../component/PlayerInput.js";
import { Transform } from "../component/Transform.js";
import { ECreateObject } from "../func.js";
import { GroupType, GameObject } from "../gameobject/gameobject.js";
import { InstantiateBox, InstantiateCamera } from "../gameobject/instantiate.js";
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
        //obj.GetComponent(Transform).scale.mul(100);
        obj.AddComponent(new PlayerInput(), PlayerInput);
        obj.SetRenderer(RendererManager.instance.FindRenderer(SimpleRenderer));

        this.mainCamera = InstantiateCamera();
        ECreateObject(this.mainCamera, GroupType.CAMERA);
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