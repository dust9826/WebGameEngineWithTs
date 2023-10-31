import { TimeManager } from "./manager/TimeManager.js";

/**
 * 로그를 관리하는 클래스
 */
export class Logger {
  /**
   * @param message 로그로 출력할 문자열
   */
  static log(message: string) 
  {    
    console.groupCollapsed(message);
    console.trace('call stack');
    console.groupEnd();
  }
  /**
   * @param message 로그로 출력할 Object
   */
  static logAny(message: any) 
  {
    console.groupCollapsed(message);
    console.dir(typeof message);
    console.trace('call stack');
    console.groupEnd();
  }
  
  /**
   * @param message 경고 형식으로 출력할 문자열
   */
  static error(message: string) 
  {
    console.error(message);
  }
  /**
   * @param message 경고 형식으로 출력할 Object
   */
  static errorAny(message: any) 
  {
    console.error(message);
  }
}