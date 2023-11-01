import { GameObject, GroupType } from "../gameobject/GameObject.js";
import { Manager } from "./Manager.js";
import { SceneManager } from "./SceneManager.js";

export class EventManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: EventManager;
    public static get instance() 
    {
      if(!EventManager._instance)
      {
        EventManager._instance = new EventManager();
      }
      return EventManager._instance;
    }
    private constructor() 
    {
      super();
      this.arrEvent = new Array<Event>();
      this.arrDead = new Array<DeadInfo>();
    }
    
    private arrEvent: Array<Event>;
    private arrDead: Array<DeadInfo>;


    init() 
    {

    }

    update(): void
    {
      const curScene = SceneManager.instance.GetCurrentScene();
      // 이전 프레임에서 등록한 Dead Object 들을 삭제한다. 
      for(let idx in this.arrDead)
      {
        const type = this.arrDead[idx].group;
        const obj = this.arrDead[idx].obj;
        const list = curScene.GetObjectByType(type);
        const node = list.search((data)=>data === obj);
        list.deleteNode(node);
      }
      this.arrDead = new Array<DeadInfo>();

      for(let idx in this.arrEvent)
      {
        this.Excute(this.arrEvent[idx]);
      }
      this.arrEvent = new Array<Event>();
    }

    private Excute(event: Event): void
    {
      switch(event.type)
      {
        case EventType.CREATE_OBJECT:
        {
          const obj: GameObject = event.lParam;
          const group: GroupType = event.wParam;
          SceneManager.instance.GetCurrentScene().AddObject(obj, group);
        }
          break;
        case EventType.DELETE_OBJECT:
        {
          const obj: GameObject = event.lParam;
          const group: GroupType = event.wParam;
          obj.SetDead();
          this.arrDead.push({obj: obj, group: group});
        }
          break;
        case EventType.SCENE_CHANGE:
        {
          SceneManager.instance.ChangeScene(event.lParam);
        }
          break;
      }
    }

    /**
     * 이벤트 배열에 이벤트를 추가
     * @param event 
     */
    AddEvent(event: Event): void
    {
      this.arrEvent.push(event);
    }
} 

export class Event
{
  type: EventType;
  lParam: any;
  wParam: any;
}

class DeadInfo
{
  obj: GameObject;
  group: GroupType;
}

export const EventType = 
{
  CREATE_OBJECT: 0,
  DELETE_OBJECT: 1,
  SCENE_CHANGE: 2,
} as const;
export type EventType = typeof EventType[keyof typeof EventType];