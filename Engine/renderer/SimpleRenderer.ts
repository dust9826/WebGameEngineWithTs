import { CWebGLAttribute, Renderer } from "./Renderer.js";
import { simple_fragment_shader, simple_vertex_shader } from "../shader/shader.js";
import { WebGLUtils } from "../module/webglutils.js";
import { GameObject } from "../gameobject/gameobject.js";
import { Transform } from "../component/Transform.js";
import { Mesh } from "../component/Mesh.js";
import { Material } from "../component/Material.js";
import { Matrix4x4, Vec3, Vec4 } from "../struct.js";
import { Camera, OrthographicCamera } from "../component/Camera.js";
import { SceneManager } from "../manager/SceneManager.js";
import { ModelCreator } from "../module/modelCreator.js";

export class SimpleRenderer extends Renderer 
{
  constructor(gl: WebGLRenderingContext)
  {
    super(gl);
  }

  private position: CWebGLAttribute;
  private matrix: WebGLUniformLocation;
  private color: CWebGLAttribute;

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
    
    this.color = {
        location: gl.getAttribLocation(this.program, "a_color"),
        buffer: gl.createBuffer(),
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.color.buffer);
    
    gl.enableVertexAttribArray(this.color.location);
    gl.vertexAttribPointer(this.color.location, 3, gl.FLOAT, false, 0, 0);

    this.matrix = gl.getUniformLocation(this.program, "u_matrix");
    //this.color = gl.getUniformLocation(this.program, "u_color");
  }

  render(obj: GameObject): void 
  {
    this.gl.useProgram(this.program);
    
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
    
    const camera = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Camera)
    const projM = camera.getProjectionMatrix();
    const viewM = camera.getViewMatrix();
    const objM = transform.getLocalMatrix();
    const matrix = objM.copy().multiply(viewM);
    matrix.multiply(projM);

    const v1 = new Vec4([-4, 4, 10, 1]);
    const v2 = new Vec4([4, 4, 10, 1]);
    v1.mulM(projM);
    v2.mulM(projM);
    console.log(v1.v);
    console.log(v2.v);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.color.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelCreator.getCubeColor()), gl.STATIC_DRAW);
    gl.uniformMatrix4fv(this.matrix, false, matrix.transpose().m);
    //gl.uniform4fv(this.color, color);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
  }
} 