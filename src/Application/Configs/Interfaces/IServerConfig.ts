import { Application } from 'express'

export default interface IServerConfig {
  App: Application
  port: string | number
  appUrl: string
}
