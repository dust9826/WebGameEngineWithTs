import { GroupType, GameObject } from "../gameobject/GameObject.js";
import { LinkedList } from "../struct.js";

export abstract class Scene 
{
    private gameObjects: Array<LinkedList<GameObject>>;
    
    constructor()
    {
        this.gameObjects = new Array<LinkedList<GameObject>>;
        for(let key in GroupType)
        {
            this.gameObjects[GroupType[key]] = new LinkedList<GameObject>();
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
    AddObject(obj: GameObject, groupType: GroupType)
    {
        this.gameObjects[groupType].insertAtEnd(obj);
    }

    GetObjectByType(groupType: GroupType)
    {
        return this.gameObjects[groupType];
    }

    abstract Enter(): void 
    abstract Exit(): void
} 