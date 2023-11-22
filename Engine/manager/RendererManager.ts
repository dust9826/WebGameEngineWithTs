import { Core } from "../Core.js";
import { Renderer } from "../renderer/Renderer.js";
import { SimpleRenderer } from "../renderer/SimpleRenderer.js";
import { Manager } from "./Manager.js";

type Constructor<T> = { new (...args: any[]): T };

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
      this.mapRenderer = new Map<string, Renderer> 
    }
    private mapRenderer: Map<string, Renderer>

    CreateRenderer<T extends Renderer>(gl: WebGLRenderingContext, className: Constructor<T>) : T
    {
      const name = className.name;
      if(this.mapRenderer[name])
      {
        throw className.name + " already created.";
      }
      const renderer = new className(gl);
      this.mapRenderer[name] = renderer;
      renderer.init();
      return renderer;
    }

    FindRenderer<T extends Renderer>(className: Constructor<T>) : T
    {
      var ret: T = this.mapRenderer[className.name];
      if(!ret)
      {
        throw className.name + " dose not created.";
      }
      return ret;
    }

    init() 
    {
      const gl = Core.instance.gl;
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.FRONT);
    }

    update()
    {
        
    }
} 