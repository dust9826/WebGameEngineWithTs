import { Material } from "./component/Material.js";
import { Mesh } from "./component/Mesh.js";
import { Transform } from "./component/Transform.js";
import { GameObject, GroupType } from "./gameobject/GameObject.js";
import { Event, EventManager, EventType } from "./manager/EventManager.js";
import { ModelCreator } from "./module/modelCreator.js";

export function ECreateObject(obj: GameObject, group: GroupType): void
{
    const event: Event = new Event();
    event.type = EventType.CREATE_OBJECT;
    event.lParam = obj;
    event.wParam = group; 
    EventManager.instance.AddEvent(event);
}

export function EDeleteObject(obj: GameObject, group: GroupType): void
{
    const event: Event = new Event();
    event.type = EventType.DELETE_OBJECT;
    event.lParam = obj;
    event.wParam = group; 
    EventManager.instance.AddEvent(event);
}

export function EChangeScene(sceneName: string): void
{
    const event: Event = new Event();
    event.type = EventType.SCENE_CHANGE;
    event.lParam = sceneName;
    EventManager.instance.AddEvent(event);
}

export function DegreeToRadians(degree: number): number
{
    return degree * Math.PI / 180;
}

export function InstantiateBox(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    const mesh = new Mesh();
    const material = new Material();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(mesh, Mesh);
    obj.AddComponent(material, Material);
    material.albedo.y = 0;
    mesh.poly = ModelCreator.getSquare();
    return obj;
}