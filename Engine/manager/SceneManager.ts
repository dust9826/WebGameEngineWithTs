import { MainScene } from "../scene/MainScene.js";
import { Scene } from "../scene/Scene.js";
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
      this.arrScene = new Map<string, Scene>();
      this.curScene = null;
    }

    private arrScene: Map<string, Scene>;
    private curScene: Scene;

    init() 
    {
      this.arrScene['MainScene'] = new MainScene();

      this.curScene = this.arrScene['MainScene'];
      this.curScene.Enter();
    }
    
    update() 
    {
      
    }
    
    GetCurrentScene(): Scene
    {
      return this.curScene;
    }

    /**
     * 
     * @param sceneName 변경될 씬의 이름
     */
    ChangeScene(sceneName: string): void
    {
      this.curScene.Exit();
      this.curScene = this.arrScene[sceneName];
      this.curScene.Enter();
    }
} 

