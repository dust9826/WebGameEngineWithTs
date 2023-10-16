export class Logger {
  static log(message: string) 
  {
    console.log(message)
  }
  static logAny(message: any) 
  {
    console.log(message)
  }
  static logError(message: string) 
  {
    console.error(message);
  }
}
