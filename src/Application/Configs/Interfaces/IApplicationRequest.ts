import { Request } from "express"

export interface IApplicationRequest extends Request {
    userId?: number
}
