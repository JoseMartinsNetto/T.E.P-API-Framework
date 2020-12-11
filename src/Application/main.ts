import { User } from './../Domain/Models/User';
import { File } from './../Domain/Models/File';
import "reflect-metadata"

import Server from "./Server"
import dotenv from "dotenv"

dotenv.config()

const server = new Server({
  port: process.env.PORT || 3333,
  appUrl: process.env.APP_URL || "http://localhost",
  databaseConnectionConfig: {
    type: "postgres",
    host: String(process.env.TYPEORM_HOST),
    password: String(process.env.TYPEORM_PASSWORD),
    database: String(process.env.TYPEORM_DATABASE),
    username: String(process.env.TYPEORM_USERNAME),
    port: Number(process.env.TYPEORM_PORT),
    synchronize: process.env.TYPEORM_SYNCHRONIZE == "true",
    migrationsTableName: "migrations",
    migrations: [],
    logging: process.env.TYPEORM_LOGGING == "true",
    entities: [User, File]
  }
})

server.run()
