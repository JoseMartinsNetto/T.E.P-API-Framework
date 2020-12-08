import App from './App'
import LogService from '../Services/LogService'
import IServerConfig from './Configs/Interfaces/IServerConfig'

export default class Server {
  public config: IServerConfig

  public constructor (config: IServerConfig) {
    this.config = config
  }

  public run () {
    App.listen(this.config.port)

    LogService.clearLog('console')

    LogService.logIntoConsole(`Server started at ${this.config.appUrl}:${this.config.port}/`)
  }
}
