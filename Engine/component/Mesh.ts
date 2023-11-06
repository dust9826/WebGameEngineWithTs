import { Vec4 } from "../struct.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class Mesh extends Component
{
    private _poly: Array<number>;
    constructor() 
    {
        super();
        this._poly = new Array<number>();
    }
    get poly(): Array<number> { return this._poly; }
    set poly(v: Array<number>) { this._poly = v; }
}
  