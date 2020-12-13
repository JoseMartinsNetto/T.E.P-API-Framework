import { ConnectionOptions } from "typeorm"

export default interface IServerConfig {
  port: string | number
  appUrl: string
  databaseConnectionConfig?: ConnectionOptions
}
