import { EObjectType, GameObject } from "../gameobject/GameObject.js";
import { LinkedList } from "../struct.js";

export abstract class Scene 
{
    private gameObjects: Array<LinkedList<GameObject>>;
    
    constructor()
    {
        this.gameObjects = new Array<LinkedList<GameObject>>;
        for(let key in EObjectType)
        {
            this.gameObjects[EObjectType[key]] = new LinkedList<GameObject>();
        }
    }

    update()
    {
        for(let idx in this.gameObjects)
        {
            const objs = this.gameObjects[idx].traverse();
            for(let i in objs)
            {
                objs[i].update();
            }
        }
    }

    render()
    {
        for(let idx in this.gameObjects)
        {
            const objs = this.gameObjects[idx].traverse();
            for(let i in objs)
            {
                objs[i].render();
            }
        }
    }

    /**
     * 
     */
    AddObject(obj: GameObject, objType: EObjectType)
    {
        this.gameObjects[objType].insertAtEnd(obj);
    }

    abstract Enter(): void 
    abstract Exit(): void
} 