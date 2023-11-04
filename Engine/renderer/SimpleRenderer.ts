import { Renderer } from "./Renderer.js";
import { simple_fragment_shader, simple_vertex_shader } from "../shader/shader.js";
import { WebGLUtils } from "../module/webglutils.js";
import { GameObject } from "../gameobject/GameObject.js";
import { Transform } from "../component/Transform.js";
import { Mesh } from "../component/Mesh.js";
import { Material } from "../component/Material.js";

export class SimpleRenderer extends Renderer 
{
  constructor(gl: WebGLRenderingContext)
  {
    super(gl);
  }

  private position: CWebGLAttribute;
  private resolution: WebGLUniformLocation;
  private color: WebGLUniformLocation;

  init()
  {
    const gl = this.gl;
    this.vss = simple_vertex_shader;
    this.fss = simple_fragment_shader;
    
    super.init();
    
    this.position = {
        location: gl.getAttribLocation(this.program, "a_position"),
        buffer: gl.createBuffer(),
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
    
    gl.enableVertexAttribArray(this.position.location);
    gl.vertexAttribPointer(this.position.location, 2, gl.FLOAT, false, 0, 0);

    this.resolution = gl.getUniformLocation(this.program, "u_resolution");
    this.color = gl.getUniformLocation(this.program, "u_color");
  }

  render(obj: GameObject): void 
  {
    this.gl.useProgram(this.program);
    console.log("draw obj:" + obj);
    this.drawObject(obj);
  }

  drawObject(obj: GameObject): void 
  {
    const gl = this.gl;
    const transform = obj.GetComponent(Transform);
    const mesh = obj.GetComponent(Mesh);
    const material = obj.GetComponent(Material);
    if(!transform || !mesh || !material)
    {
      //return;
    }

    console.log(gl);
    console.log(this.position);
    // 임시
    // 2D 포인트 3개
    var positions = [
      100, 200,
      800, 200,
      100, 300,
      100, 300,
      800, 200,
      800, 300,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.uniform2f(this.resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform4fv(this.color, [1,0,0.5,1]);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
  }
} 

class CWebGLAttribute
{
    location: number;
    buffer: WebGLBuffer;
}