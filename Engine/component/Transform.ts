import { Matrix4x4, Vec3 } from "../struct.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class Transform extends Component
{
    private _position: Vec3;
    private _rotation: Vec3;
    private _scale: Vec3;
    private matrix: Matrix4x4;
    constructor() 
    {
        super();
        this.matrix = Matrix4x4.identity();
        this.matrix.m[0] = 2;
        this._position = Vec3.zero();
        this._position.x = 1;
        this._rotation = Vec3.zero();
        this._scale = Vec3.one();
        this._scale.mul(100);
    }
    get position(): Vec3 { return this._position; }
    get rotation(): Vec3 { return this._rotation; }
    get scale(): Vec3 { return this._scale; }
    
    getLocalMatrix(): Matrix4x4
    {
        // 역순으로 계산한다
        this.matrix = Matrix4x4.identity();
        this.matrix.multiply(Matrix4x4.translationV(this.position.v));
        this.matrix.multiply(Matrix4x4.rotationV(this.rotation.v));
        this.matrix.multiply(Matrix4x4.scalingV(this.scale.v));
        return this.matrix;
    }
}
  