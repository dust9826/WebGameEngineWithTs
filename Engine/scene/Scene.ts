import { EObjectType, GameObject } from "../gameobject/GameObject.js";

export abstract class Scene 
{
    private gameObjects: Array<Array<GameObject>>;
    
    constructor()
    {
        this.gameObjects = new Array<Array<GameObject>>;
        for(let key in EObjectType)
        {
            this.gameObjects[EObjectType[key]] = new Array<GameObject>();
        }
    }

    update()
    {
        for(let idx in this.gameObjects)
        {
            console.log(idx);
        }
    }

    render()
    {
        for(let idx in this.gameObjects)
        {
            console.log(idx);
        }
    }

    /**
     * 
     */
    AddObject(obj: GameObject, objType: EObjectType)
    {
        this.gameObjects[objType].push(obj);
    }

    abstract Enter(): void 
    abstract Exit(): void
} 