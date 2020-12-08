/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from './BaseService'

class LogService extends BaseService {
  public logIntoConsole (content: any, obj?: any): void{
    if (obj) {
      console.log(content, obj)
      console.log()
      return
    }
    console.log(content)
    console.log()
  }

  public clearLog (where: string): void{
    if (where === 'console') {
      console.clear()
    }
  }
}

export default new LogService()
