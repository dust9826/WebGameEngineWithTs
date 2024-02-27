import { ModelCreator } from "../module/modelCreator.js";
import { Vec4 } from "../struct.js";
import { Component } from "./Component.js";

/**
 * 
 */
export class Sprite extends Component
{
    private _texCoord: Array<number>;
    private _source: HTMLImageElement;
    private _isReady: boolean;
    constructor() 
    {
        super();
        this._texCoord = new Array<number>();
        this._source = new Image();
        this.SetSource((document.querySelector('#default') as HTMLImageElement).src);
        this._texCoord = [
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0];

    }
    get texCoord(): Array<number> { return this._texCoord; }
    set texCoord(v: Array<number>) { this._texCoord = v; }
    get source(): HTMLImageElement { return this._source; }
    get isReady(): boolean { return this._isReady; }
    set isReady(v: boolean) { this._isReady = v; }

    public SetSource(v: string)
    {
        this._isReady = false;
        this._source.src = v; 
        this._source.onload = () => this._isReady = true;
    }
}
  