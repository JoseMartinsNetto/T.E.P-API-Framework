import ICustomRequest from './ICustomRequest'
import { NextFunction, Response } from 'express'

export default interface IMiddleware{
    intercepter(req: ICustomRequest, res: Response, next: NextFunction): NextFunction | Response | void ;
  }
