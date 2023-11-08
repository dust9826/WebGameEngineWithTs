import { Material } from "./component/Material.js";
import { Mesh } from "./component/Mesh.js";
import { Transform } from "./component/Transform.js";
import { GameObject, GroupType } from "./gameobject/gameobject.js";
import { Event, EventManager, EventType } from "./manager/EventManager.js";
import { KeyCode, KeyManager, KeyState } from "./manager/KeyManager.js";
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

export function KeyTap(code: KeyCode): boolean
{
    return KeyManager.instance.GetKeyState(code) === KeyState.TAP;
}
export function KeyHold(code: KeyCode): boolean
{
    return KeyManager.instance.GetKeyState(code) === KeyState.HOLD;
}
export function KeyAway(code: KeyCode): boolean
{
    return KeyManager.instance.GetKeyState(code) === KeyState.AWAY;
}
export function KeyNone(code: KeyCode): boolean
{
    return KeyManager.instance.GetKeyState(code) === KeyState.NONE;
}

export function DegreeToRadians(degree: number): number
{
    return degree * Math.PI / 180;
}