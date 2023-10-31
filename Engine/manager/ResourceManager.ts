import { Manager } from "./Manager.js";

export class ResourceManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: ResourceManager;
    public static get instance() 
    {
      if(!ResourceManager._instance)
      {
        ResourceManager._instance = new ResourceManager();
      }
      return ResourceManager._instance;
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