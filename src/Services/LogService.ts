/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseService } from "./BaseService"

export class LogService extends BaseService {
  public static logIntoConsole(content: any, obj?: any){
    if (obj) {
      console.log(content, obj)
      console.log()
      return
    }
    console.log(content)
    console.log()
  }

  public static clearLog(where: "console" | "all") {
    if (where === "console") {
      console.clear()
    }
  }
}
