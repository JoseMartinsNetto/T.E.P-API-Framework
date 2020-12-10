import DatabaseConnection from "../Database/DatabaseConnection"
import LogService from "../Services/LogService"
import IServerConfig from "./Configs/Interfaces/IServerConfig"

export default class Server {
  public constructor(private config: IServerConfig) { }

  public run() {
    DatabaseConnection.connect(this.config.databaseConnectionConfig).then(() => {
      this.config.app.listen(this.config.port)

      LogService.logIntoConsole(`Server started at ${this.config.appUrl}:${this.config.port}/`)
    })
  }
}
