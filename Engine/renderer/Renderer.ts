import { Material } from "../component/Material.js";
import { Mesh } from "../component/Mesh.js";
import { Transform } from "../component/Transform.js";
import { GameObject } from "../gameobject/gameobject.js";
import { WebGLUtils } from "../module/webglutils.js";


export abstract class Renderer 
{
  constructor(gl: WebGLRenderingContext)
  {
    this.gl = gl;
  }
  protected gl: WebGLRenderingContext;
  protected vss: string; // 버텍스 셰이더 소스
  protected fss: string; // 프래그먼트 셰이더
  protected program: WebGLProgram;

  init()
  {
    const gl = this.gl;
    this.program = WebGLUtils.createShaderFromString(gl, this.vss, this.fss);
  }

  render(obj: GameObject): void
  {

  }
} 