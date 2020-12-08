import { Response } from 'express'

import FileService from '../../../Services/FileService'
import HttpCodes from '../HttpCodes'
import ICustomRequest from '../../Configs/Interfaces/ICustomRequest'

class UploadFileController {
  public async upload (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const { originalname: name, size, filename: key } = req.file

      const fileRequest = { name, size, key, url: `${process.env.STORAGE_URL}/${key}` }

      const file = await FileService.saveFromUpload(fileRequest)
      return res.status(HttpCodes.CREATED).json(file)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async index (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const files = await FileService.getAll()
      return res.status(HttpCodes.OK).json(files)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async delete (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await FileService.delete(id)
      return res.status(HttpCodes.NO_CONTENT).send()
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}

export default new UploadFileController()
