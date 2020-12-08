import express, { Application } from 'express'
import cors from 'cors'
import routes from './Routes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import DatabaseConnection from '../Database/DatabaseConnection'
import LogService from '../Services/LogService'
import HttpCodes from './Http/HttpCodes'

class App {
    public express: Application

    private useStaticFiles: boolean

    public constructor () {
      dotenv.config()
      const USE_STATIC_FILES = process.env.USE_STATIC_FILES

      this.useStaticFiles = USE_STATIC_FILES === 'true'
      this.express = express()

      this.middlewares()
      this.routes()
      // DatabaseConnection.connect()
      //   .then((response): void => LogService.logIntoConsole(response))
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(express.urlencoded())
      this.express.use(cors())
      this.express.use(morgan('dev'))

      if (this.useStaticFiles) {
        this.express.use(express.static(path.join(__dirname, '..', '..', 'public')))
      }
    }

    private routes (): void {
      this.express.use(`${process.env.API_PREFIX}/${process.env.API_CURRENT_VERSION}`, routes)
      this.express.use(`${process.env.FRONT_PREFIX_URI}/*`, (req, res) => {
        const USE_CLIENT_MODE = process.env.USE_CLIENT_MODE
        const useClientMode = USE_CLIENT_MODE === 'true'

        if (useClientMode) {
          return res.sendFile(path.join(__dirname, '..', '..', 'public/index.html'))
        }

        return res.status(HttpCodes.NOT_FOUND).send()
      })
    }
}

export default new App().express
