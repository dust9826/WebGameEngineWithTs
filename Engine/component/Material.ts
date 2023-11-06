import { Vec4 } from "../struct.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class Material extends Component
{
    private _albedo: Vec4;
    constructor()
    {
        super();
        this.albedo = Vec4.one();
    }
    get albedo(): Vec4 { return this._albedo; }
    set albedo(v: Vec4) { this._albedo = v; }
}
  