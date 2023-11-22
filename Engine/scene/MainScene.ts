import { Core } from "../Core.js";
import { PlayerInput } from "../component/PlayerInput.js";
import { Transform } from "../component/Transform.js";
import { ECreateObject } from "../func.js";
import { GroupType, GameObject } from "../gameobject/gameobject.js";
import { InstantiateBox, InstantiateCamera, InstantiateCoord, InstantiateEmpty } from "../gameobject/instantiate.js";
import { RendererManager } from "../manager/RendererManager.js";
import { SimpleRenderer } from "../renderer/SimpleRenderer.js";
import { Scene } from "./Scene.js";

export class MainScene extends Scene
{
    Enter(): void 
    {
        this.initRenderer();
        console.log(1);
        const obj = InstantiateEmpty();
        //obj.GetComponent(Transform).scale.mul(100);
        obj.AddComponent(new PlayerInput(), PlayerInput);
        ECreateObject(obj, GroupType.PLAYER);

        //const coord = InstantiateCoord();
        //ECreateObject(coord, GroupType.PLAYER);

        const c1 = InstantiateBox();
        ECreateObject(c1, GroupType.PLAYER);
        const c2 = InstantiateBox();
        ECreateObject(c2, GroupType.PLAYER);

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