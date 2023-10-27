import { Manager } from "./Manager.js";

export class SceneManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: SceneManager;
    public static get instance() 
    {
      if(!SceneManager._instance)
      {
        SceneManager._instance = new SceneManager();
      }
      return SceneManager._instance;
    }
    private constructor() 
    {
      super();
    }

    init() {
        
    }
    
    update() {
        
    }
    
} 