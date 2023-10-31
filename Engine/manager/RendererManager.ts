import { Manager } from "./Manager.js";

export class RendererManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: RendererManager;
    public static get instance() 
    {
      if(!RendererManager._instance)
      {
        RendererManager._instance = new RendererManager();
      }
      return RendererManager._instance;
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