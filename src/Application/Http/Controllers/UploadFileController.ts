import { Response } from "express"

import { FileService } from "../../../Services/FileService"
import HttpCodes from "../HttpCodes"
import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"

export class UploadFileController {
  constructor(private service: FileService) { }

  static instance() {
    return new UploadFileController(FileService.instance())
  }

  public async upload(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const { originalname: name, size, filename: key } = req.file

      const fileRequest = { name, size, key, url: `${process.env.STORAGE_URL}/${key}` }

      const file = await this.service.saveFromUpload(fileRequest)
      return res.status(HttpCodes.CREATED).json(file)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async index(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const files = await this.service.getAll()
      return res.status(HttpCodes.OK).json(files)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async delete(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await this.service.delete(Number(id))
      return res.status(HttpCodes.NO_CONTENT).send()
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}