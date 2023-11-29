import { Core } from "../Core.js";
import { Material } from "../component/Material.js";
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
        c1.GetComponent(Transform).position.z = 10;
        c1.GetComponent(Material).albedo.x = 0;
        ECreateObject(c1, GroupType.PLAYER);

        const c2 = InstantiateBox();
        c2.GetComponent(Transform).position.z = -10;
        c2.GetComponent(Material).albedo.z = 0;
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