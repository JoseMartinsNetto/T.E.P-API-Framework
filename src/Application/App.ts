import express, { Application } from "express"
import cors from "cors"
import routes from "./Routes"
import morgan from "morgan"
import path from "path"

class App {
  private useStaticFiles: boolean

  public constructor(public expressInstance: Application) {
    this.useStaticFiles = process.env.USE_STATIC_FILES === "true"

    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.expressInstance.use(express.json())
    this.expressInstance.use(express.urlencoded({ extended: true }))
    this.expressInstance.use(cors())
    this.expressInstance.use(morgan("dev"))

    if (this.useStaticFiles) {
      this.expressInstance.use(express.static(path.join(__dirname, "..", "..", "public", "files")))
    }
  }

  private routes(): void {
    this.expressInstance.use(`${process.env.APP_PREFIX_URI}/`, (req, res) => {
      return res.sendFile(path.join(__dirname, "..", "..", "public", "app/index.html"))
    })

    this.expressInstance.use(`${process.env.ADMIN_PREFIX_URI}/`, (req, res) => {
      return res.sendFile(path.join(__dirname, "..", "..", "public", "admin/index.html"))
    })

    this.expressInstance.use(`${process.env.API_PREFIX}/${process.env.API_CURRENT_VERSION}/status`, (req, res) => res.send({ status: "ok" }))
    this.expressInstance.use(`${process.env.API_PREFIX}/${process.env.API_CURRENT_VERSION}`, routes)
  }
}

export default new App(express())
