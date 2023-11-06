import { Renderer } from "./Renderer.js";
import { simple_fragment_shader, simple_vertex_shader } from "../shader/shader.js";
import { WebGLUtils } from "../module/webglutils.js";
import { GameObject } from "../gameobject/GameObject.js";
import { Transform } from "../component/Transform.js";
import { Mesh } from "../component/Mesh.js";
import { Material } from "../component/Material.js";
import { Matrix4x4, Vec4 } from "../struct.js";

export class SimpleRenderer extends Renderer 
{
  constructor(gl: WebGLRenderingContext)
  {
    super(gl);
  }

  private position: CWebGLAttribute;
  private matrix: WebGLUniformLocation;
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
    gl.vertexAttribPointer(this.position.location, 3, gl.FLOAT, false, 0, 0);

    this.matrix = gl.getUniformLocation(this.program, "u_matrix");
    this.color = gl.getUniformLocation(this.program, "u_color");
  }

  render(obj: GameObject): void 
  {
    this.gl.useProgram(this.program);
    console.log("draw obj:" + obj);
    
    const fieldOfView = 60;
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 1;
    const zFar = 100;
    const projectionMatrix = Matrix4x4.perspective(fieldOfView, aspect, zNear, zFar);
    console.log(this.gl);
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
      return;
    }
    
    const positions = mesh.poly;
    const color = material.albedo.v;

    const fieldOfView = 60;
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 1;
    const zFar = 100;
    const v4 = new Vec4([1, 1, 0, 1]);
    var projectionMatrix = Matrix4x4.perspective(fieldOfView, aspect, zNear, zFar);
    projectionMatrix = Matrix4x4.projection(this.gl.canvas.width, this.gl.canvas.height, 100);
    console.log(v4.copy().mulM(projectionMatrix));
    console.log(projectionMatrix.m);
    console.log(transform.getLocalMatrix());
    projectionMatrix.multiply(transform.getLocalMatrix());
    console.log(projectionMatrix.m);
    console.log(v4.copy().mulM(projectionMatrix));
    console.log(transform);
    console.log(positions);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.uniformMatrix4fv(this.matrix, false, projectionMatrix.inverse().m);
    gl.uniform4fv(this.color, color);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
  }
} 

class CWebGLAttribute
{
    location: number;
    buffer: WebGLBuffer;
}