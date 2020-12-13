import { IApplicationRequest } from "./IApplicationRequest"
import { NextFunction, Response } from "express"

export interface IApplicationMiddleware {
  intercepter(req: IApplicationRequest, res: Response, next: NextFunction): NextFunction | Response | void;
}
