import { Logger } from "./log.js";

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
    
    cvs.style.width = '100vw';
    cvs.style.height = '99vh';

    this.gl = cvs.getContext('webgl');
    if(this.gl == null)
    {
      Logger.logError('webgl dose not support in this website');
      return false;
    }

    Logger.log('success to create core');   

    window.onresize = () => {
      this.resizeCanvasToDisplaySize();
      this.update();
    }

    return true;
  }

  update()
  {
    this.render();
  }

  render()
  {
    const cvs = this.gl.canvas as HTMLCanvasElement;
    this.gl.viewport(0, 0, cvs.clientWidth, cvs.clientHeight);
    Logger.logAny(this.gl);
  }

  resizeCanvasToDisplaySize() {
    const canvas = this.gl.canvas as HTMLCanvasElement;

    // 브라우저가 캔버스를 표시하고 있는 크기를 CSS 픽셀 단위로 얻어옵니다.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // 캔버스와 크기가 다른지 확인합니다.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) {
      // 캔버스를 동일한 크기가 되도록 합니다.
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
  }
}
