import { Vec4 } from "../struct.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class Mesh extends Component
{
    private _poly: Array<number>;
    public poly32: Float32Array;
    private _indices: Array<number>;
    public indices16: Uint16Array;
    constructor() 
    {
        super();
        this._poly = new Array<number>();
    }
    get poly(): Array<number> { return this._poly; }
    set poly(v: Array<number>) 
    {
        this._poly = v; 
        this.poly32 = new Float32Array(this._poly);
    }
    set indices(v: Array<number>) 
    {
        this._indices = v; 
        this.indices16 = new Uint16Array(this._indices);
    }
}
  