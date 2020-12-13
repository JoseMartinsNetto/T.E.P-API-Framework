import Multer, { Options } from "multer"
import { RequestHandler } from "express"
import { IApplicationMiddleware } from "../../Configs/Interfaces/IApplicationMiddleware"
import multerConfig from "../../Configs/multerConfig";

export class UploadFileMiddleware implements IApplicationMiddleware {
  public intercepter: RequestHandler;

  static instance() {
    return new UploadFileMiddleware(Multer, multerConfig)
  }

  public constructor(private multer: typeof Multer, private config: Options) {
    this.intercepter = this.multer(this.config).single("file")
  }
}
