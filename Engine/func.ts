import { GameObject, GroupType } from "./gameobject/GameObject.js";
import { Event, EventManager, EventType } from "./manager/EventManager.js";

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