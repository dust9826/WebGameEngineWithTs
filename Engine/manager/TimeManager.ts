import { Logger } from "../Logger.js";
import { Manager } from "./Manager.js";

export class TimeManager extends Manager
{
    // 싱글톤 패턴 구현
    private static _instance: TimeManager;
    public static get instance() 
    {
      if(!TimeManager._instance)
      {
        TimeManager._instance = new TimeManager();
      }
      return TimeManager._instance;
    }
    private constructor() 
    {
      super();
      this.prevTime = new Date();
      this.startTime = new Date();
      this._deltaTime = 0;
    }

    private _deltaTime: number;
    private prevTime: Date;
    private startTime: Date;

    init() 
    {
      this.prevTime = new Date();
      this.startTime = new Date();
      this._deltaTime = 0;      
    }

    update()
    {
      const curTime: Date = new Date();
      this._deltaTime = curTime.getTime() - this.prevTime.getTime();
      this.prevTime = curTime;
    }

    get deltaTime() : number
    {
      return this._deltaTime;
    }

    get accTime() : number
    {
      return this.prevTime.getTime() - this.startTime.getTime();
    }
} 