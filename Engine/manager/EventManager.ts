import { Manager } from "./Manager.js";

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
    }
    

    init() 
    {
        
    }

    update()
    {
        
    }
} 