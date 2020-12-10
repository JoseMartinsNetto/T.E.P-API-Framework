import "reflect-metadata"

import Server from "./Server"
import App from "./App"
import dotenv from "dotenv"

dotenv.config()

const server = new Server({
  app: App.expressInstance,
  port: process.env.PORT || 3333,
  appUrl: process.env.APP_URL || "http://localhost"
})

server.run()
