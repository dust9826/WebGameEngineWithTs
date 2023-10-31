import { Logger } from "./Logger.js";
import { TimeManager } from "./manager/TimeManager.js";
import { KeyManager } from "./manager/KeyManager.js";
import { SceneManager } from "./manager/SceneManager.js";

/**
 * 게임 엔진의 초기화 및 주기를 설정해준다.
 */
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
  private intervalID;
  
  /**
   * 게임 엔진을 최초 1회 초기화 한다. 
   * @param canvasId 게임 엔진의 화면으로 출력될 캔버스의 이름
   * @returns 게임 엔진 초기화 성공 여부 
   */
  init(canvasId: string): boolean
  { 
    const cvs = document.querySelector(canvasId);
    // canvasId 이름의 캔버스가 존재하지 않는 경우
    if(!(cvs instanceof HTMLCanvasElement))
    {
      Logger.error('Cannot find canvas name ' + canvasId);
      return false;
    }
    
    // 캔버스를 전체화면에 맞게 설정 (Editor 에서 변경할 것)
    cvs.style.width = '100vw';
    cvs.style.height = '99vh';
    Logger.log('this use for test page. Change in Editor');

    this.gl = cvs.getContext('webgl');
    // 브라우저에서 webgl 을 지원하지 않을 경우
    if (this.gl == null)
    {
      Logger.error('webgl dose not support in this website');
      return false;
    }

    if (!this.initManagers())
    {
      Logger.error('error when initializing in Manager');
      return false;
    }

    Logger.log('success to create core');   
    
    // 윈도우 이벤트 설정
    window.onresize = () => {
      this.resizeCanvasToDisplaySize();
      this.update();
    }

    // 마우스 커서 숨기기
    document.body.onclick = async (e) => {
      await document.body.requestPointerLock();
    };

    document.onpointerlockchange = (e) => {
      if (document.pointerLockElement === document.body) {
        this.intervalID = window.setInterval(() => this.update(), 10);
      }
      else {
        window.clearInterval(this.intervalID);
      }
    };
    
    return true;
  }

  /**
   * 매니저 클래스들을 초기화하는 함수
   * @returns 매니저 클래스들의 초기화 성공 여부
   */
  initManagers() : boolean 
  {
    TimeManager.instance.init();
    KeyManager.instance.init();
    SceneManager.instance.init();

    return true;
  }

  /**
   * 게임 엔진의 해당 프레임에서 사용할 Manager 들의 정보를 순차적으로 업데이트 한다.
   */
  update()
  {
    TimeManager.instance.update();
    KeyManager.instance.update();
    
    SceneManager.instance.GetCurrentScene().update();
    
    
    this.render();
  }

  /**
   * 업데이트된 해당 프레임의 정보를 바탕으로 화면에 그린다.
   */
  render()
  {
    const cvs = this.gl.canvas as HTMLCanvasElement;
    this.gl.viewport(0, 0, cvs.clientWidth, cvs.clientHeight);
    SceneManager.instance.GetCurrentScene().render();
  }

  /**
   * @returns 캔버스의 크기가 실제 크기와 같은지
   */
  resizeCanvasToDisplaySize() : boolean
  {
    const canvas = this.gl.canvas as HTMLCanvasElement;

    // 브라우저가 캔버스를 표시하고 있는 크기를 CSS 픽셀 단위로 얻어옵니다.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // 캔버스와 크기가 다른지 확인합니다.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) 
    {
      // 캔버스를 동일한 크기가 되도록 합니다.
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
  }
}
