import multer, { Options } from "multer"
import { RequestHandler } from "express"
import multerConfig from "../../Configs/multerConfig"
import { IApplicationMiddleware } from "../../Configs/Interfaces/IApplicationMiddleware"

class UploadFileMiddleware implements IApplicationMiddleware {
    public intercepter: RequestHandler;
    private config: Options;

    public constructor (config: Options) {
      this.config = config
      this.intercepter = multer(this.config).single("file")
    }
}

export default new UploadFileMiddleware(multerConfig).intercepter
