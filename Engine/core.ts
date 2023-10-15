import { Logger } from "./log";

export class Core
{
  // 싱글톤 패턴 구현
  private static _instance: Core;
  public static get instance() 
  {
    if(!Core._instance)
    {
      Core._instance = new Core();
    }
    return Core._instance;
  }
  private constructor() {}
  
  public gl: WebGLRenderingContext;
  
  init(canvasId: string)
  { 
    var cvs = document.querySelector(canvasId);
    if(!(cvs instanceof HTMLCanvasElement))
    {
      Logger.logError('Cannot find canvas name ' + canvasId);
      return false;
    }
    
    this.gl = cvs.getContext('webgl');
    if(this.gl == null)
    {
      Logger.logError('webgl dose not support in this website');
      return false;
    }

    cvs.style.width = '100vw';
    cvs.style.height = '99vh';
    console.log(this.gl);
    return true;
  }
}
