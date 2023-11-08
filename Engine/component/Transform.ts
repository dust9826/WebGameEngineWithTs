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
    constructor() 
    {
        super();
        this._position = Vec3.zero();
        this._rotation = Vec3.zero();
        this._scale = Vec3.one();
    }
    get position(): Vec3 { return this._position; }
    get rotation(): Vec3 { return this._rotation; }
    get scale(): Vec3 { return this._scale; }
    
    getLocalMatrix(): Matrix4x4
    {
        const matrix = Matrix4x4.identity();
        matrix.multiply(Matrix4x4.scalingV(this.scale.v));
        matrix.multiply(Matrix4x4.rotationV(this.rotation.v));
        matrix.multiply(Matrix4x4.translationV(this.position.v));
        return matrix;
    }
}
  