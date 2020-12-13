import express from 'express';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { Constants } from "../Constants"
import PostgresConnector from "../Database/PostgresConnector"
import { LogService } from "../Services/LogService"
import { App } from "./App"
import IServerConfig from "./Configs/Interfaces/IServerConfig"
import { getRoutes } from './Routes';

export default class Server {
  public constructor(private config: IServerConfig) { }

  public async run() {
    LogService.clearLog("console")
    const connectionOptions = this.config.databaseConnectionConfig as PostgresConnectionOptions
    await PostgresConnector.connect(connectionOptions)

    const app = new App(express(), getRoutes())

    app.expressInstance.listen(this.config.port)

    LogService.logIntoConsole(
      Constants.SuccessMessages.application.successRun(
        this.config.appUrl,
        this.config.port
      )
    )
  }
}
