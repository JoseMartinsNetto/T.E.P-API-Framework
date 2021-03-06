import express, { Application, Router } from "express"
import cors from "cors"
import path from "path"

import dotenv from "dotenv"
dotenv.config()

export class App {
  private useStaticFiles: boolean
  private enviroment: string

  public constructor(public expressInstance: Application, private routes: Router) {
    this.useStaticFiles = process.env.USE_STATIC_FILES === "true"
    this.enviroment = String(process.env.ENVIROMENT)

    this.setupMiddlewares()
    this.setupRoutes()
  }

  private setupMiddlewares(): void {
    this.expressInstance.use(express.json())
    this.expressInstance.use(express.urlencoded({ extended: true }))
    this.expressInstance.use(cors())

    if (this.enviroment == "development") {
      // this.expressInstance.use(morgan("dev"))
    }

    if (this.useStaticFiles) {
      this.expressInstance.use(express.static(path.join(__dirname, "..", "..", "public", "files")))
    }
  }

  private setupRoutes(): void {
    this.expressInstance.use(`${process.env.APP_PREFIX_URI}/`, (req, res) => {
      return res.sendFile(path.join(__dirname, "..", "..", "public", "app/index.html"))
    })

    this.expressInstance.use(`${process.env.ADMIN_PREFIX_URI}/`, (req, res) => {
      return res.sendFile(path.join(__dirname, "..", "..", "public", "admin/index.html"))
    })

    this.expressInstance.use(`${process.env.API_PREFIX}/${process.env.API_CURRENT_VERSION}/status`, (req, res) => res.send({ status: "ok" }))
    this.expressInstance.use(`${process.env.API_PREFIX}/${process.env.API_CURRENT_VERSION}`, this.routes)
  }
}
