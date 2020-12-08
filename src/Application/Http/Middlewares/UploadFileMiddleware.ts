import multer, { Options } from 'multer'
import { RequestHandler } from 'express'
import multerConfig from '../../Configs/multerConfig'
import IMiddleware from '../../Configs/Interfaces/IMiddleware'

class UploadFileMiddleware implements IMiddleware {
    public intercepter: RequestHandler;
    private config: Options;

    public constructor (config: Options) {
      this.config = config
      this.intercepter = multer(this.config).single('file')
    }
}

export default new UploadFileMiddleware(multerConfig).intercepter
