import { Application } from "express"
import { ConnectionOptions } from "typeorm"

export default interface IServerConfig {
  app: Application
  port: string | number
  appUrl: string
  databaseConnectionConfig?: ConnectionOptions
}
