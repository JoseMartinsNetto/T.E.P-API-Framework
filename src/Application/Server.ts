import { Constants } from "../Constants"
import PostgresConnector from "../Database/PostgresConnector"
import LogService from "../Services/LogService"
import IServerConfig from "./Configs/Interfaces/IServerConfig"

export default class Server {
  public constructor(private config: IServerConfig) { }

  public run() {
    // LogService.clearLog("console")
    PostgresConnector.connect(this.config.databaseConnectionConfig).then(() => {
      this.config.app.listen(this.config.port)
      LogService.logIntoConsole(
        Constants.SuccessMessages.application.successRun(
          this.config.appUrl,
          this.config.port
        )
      )
    })
  }
}
