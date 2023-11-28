import { Core } from "../Core.js";
import { Matrix4x4, Vec3 } from "../struct.js";
import { Component } from "./Component.js";
import { Transform } from "./Transform.js";

/**
 * 
 */
export class Camera extends Component
{
    getViewMatrix(): Matrix4x4
    {
        const transform = this.gameobject.GetComponent(Transform);
        return transform.getLocalMatrix().inverse();
    }
    getProjectionMatrix(): Matrix4x4
    {
        return Matrix4x4.identity()
    }
}
  
export class PerspectiveCamera extends Camera
{
    private _fieldOfView: number;
    private _aspect: number;
    private _zNear: number;
    private _zFar: number;

    get fieldOfView(): number { return this._fieldOfView; }
    set fieldOfView(value: number) { this._fieldOfView = value; }
    get aspect(): number { return this._aspect; }
    set aspect(value: number) { this._aspect = value; }
    get zNear(): number { return this._zNear; }
    set zNear(value: number) { this._zNear = value; }
    get zFar(): number { return this._zFar; }
    set zFar(value: number) { this._zFar = value; }

    constructor() 
    {
        super();
        const gl = Core.instance.gl;
        this.fieldOfView = 60;
        this.aspect = gl.canvas.width / gl.canvas.height;
        this.zNear = 0.1;
        this.zFar = 100;
        this.Update();
    }
    
    Update(): void 
    {
        const gl = Core.instance.gl;
        this.aspect = gl.canvas.width / gl.canvas.height;
    }

    getProjectionMatrix(): Matrix4x4 
    {
        return Matrix4x4.perspective(this.fieldOfView, this.aspect, this.zNear, this.zFar);
    }
}
  
export class OrthographicCamera extends Camera
{
    private _height: number;
    private _width: number;
    private _depth: number;

    get height(): number { return this._height; }
    set height(value: number) { this._height = value; }
    get width(): number { return this._width; }
    set width(value: number) { this._width = value; }
    get depth(): number { return this._depth; }
    set depth(value: number) { this._depth = value; }
    
    constructor() 
    {
        super();
        this.depth = 100;
        this.Update();
    }

    Update(): void 
    {
        const gl = Core.instance.gl;
        this.width = gl.canvas.width;
        this.height = gl.canvas.height;
    }

    getProjectionMatrix(): Matrix4x4 
    {
        return Matrix4x4.orthographic(this.width, this.height, this.depth);
    }
}