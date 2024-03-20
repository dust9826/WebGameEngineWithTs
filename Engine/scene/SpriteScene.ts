import { Core } from "../Core.js";
import { Material } from "../component/Material.js";
import { PlayerInput } from "../component/PlayerInput.js";
import { Transform } from "../component/Transform.js";
import { ECreateObject } from "../func.js";
import { GroupType } from "../gameobject/gameobject.js";
import { InstantiateCamera, InstantiateEmpty, InstantiateSprite } from "../gameobject/instantiate.js";
import { RendererManager } from "../manager/RendererManager.js";
import { SpriteRenderer } from "../renderer/SpriteRenderer.js";
import { Scene } from "./Scene.js";

export class SpriteScene extends Scene
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

        const player = InstantiateSprite();
        player.GetComponent(Transform).position.z = 10;
        player.GetComponent(Material).albedo.x = 0;

        player.AddComponent(new PlayerInput(), PlayerInput);
        
        ECreateObject(player, GroupType.PLAYER);

        const sz = 5;
        for(let x=0; x<sz; ++x)
        {
            for(let y=0; y<sz; ++y)
            {
                const tmp = InstantiateSprite();
                tmp.GetComponent(Transform).position.x = x * 100;
                tmp.GetComponent(Transform).position.y = y * 100;
                ECreateObject(tmp, GroupType.PLAYER);
            }
        }

        this.mainCamera = InstantiateCamera();
        player.AddChild(this.mainCamera);
        ECreateObject(this.mainCamera, GroupType.CAMERA);

    }
    
    Exit(): void 
    {
        
    }
    
    initRenderer()
    {
        const gl = Core.instance.gl;
        RendererManager.instance.CreateRenderer(gl, SpriteRenderer);
    }
    
    update() {super.update();}
    lateupdate(): void {super.lateupdate();}
    render() {super.render();}

} 