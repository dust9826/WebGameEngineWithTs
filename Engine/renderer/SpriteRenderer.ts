import { CWebGLAttribute, Renderer } from "./Renderer.js";
import { Camera } from "../component/Camera.js";
import { Material } from "../component/Material.js";
import { Mesh } from "../component/Mesh.js";
import { Sprite } from "../component/Sprite.js";
import { Transform } from "../component/Transform.js";
import { GameObject } from "../gameobject/gameobject.js";
import { SceneManager } from "../manager/SceneManager.js";
import { sprite_fragment_shader, sprite_vertex_shader } from "../shader/shader.js";
import { Vec4 } from "../struct.js";

export class SpriteRenderer extends Renderer
{
    constructor(gl: WebGLRenderingContext)
    {
      super(gl);
    }
  
    private position: CWebGLAttribute;
    private matrix: WebGLUniformLocation;
    private texture: WebGLTexture;
    private texCoord: CWebGLAttribute;
  
    init()
    {
      const gl = this.gl;
      this.vss = sprite_vertex_shader;
      this.fss = sprite_fragment_shader;
      
      super.init();
      
      this.position = {
          location: gl.getAttribLocation(this.program, "a_position"),
          buffer: gl.createBuffer(),
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
      
      gl.enableVertexAttribArray(this.position.location);
      gl.vertexAttribPointer(this.position.location, 3, gl.FLOAT, false, 0, 0);
      
      this.texCoord = {
          location: gl.getAttribLocation(this.program, "a_texCoord"),
          buffer: gl.createBuffer(),
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord.buffer);
      
      gl.enableVertexAttribArray(this.texCoord.location);
      gl.vertexAttribPointer(this.texCoord.location, 2, gl.FLOAT, false, 0, 0);
  
      this.matrix = gl.getUniformLocation(this.program, "u_matrix");
      //this.color = gl.getUniformLocation(this.program, "u_color");

      this.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
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
      const sprite = obj.GetComponent(Sprite);
      if(!transform || !mesh || !material || !sprite)
      {
        return;
      }
      
      const positions = mesh.poly;
      const texCoord: Array<number>  = sprite.texCoord;
      const image: HTMLImageElement = sprite.source;
      
      const camera = SceneManager.instance.GetCurrentScene().mainCamera.GetComponent(Camera)
      const projM = camera.getProjectionMatrix();
      const viewM = camera.getViewMatrix();
      const objM = transform.getLocalMatrix();
      const matrix = objM.copy().multiply(viewM);
      matrix.multiply(projM);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, this.position.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
      gl.uniformMatrix4fv(this.matrix, false, matrix.transpose().m);
      //gl.uniform4fv(this.color, color);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
      gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
    }
}