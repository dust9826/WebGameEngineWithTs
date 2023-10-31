import { Manager } from "./Manager.js";

export class UIManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: UIManager;
    public static get instance() 
    {
      if(!UIManager._instance)
      {
        UIManager._instance = new UIManager();
      }
      return UIManager._instance;
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