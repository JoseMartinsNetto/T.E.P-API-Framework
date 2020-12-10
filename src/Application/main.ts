import Server from "./Server"
import App from "./App"
import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()

const server = new Server({
  app: App.expressInstance,
  port: process.env.PORT || 3333,
  appUrl: process.env.APP_URL || "http://localhost",
  databaseConnectionConfig: {
    name: "default",
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
})

server.run()
