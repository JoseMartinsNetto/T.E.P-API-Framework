import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"
import {IDecodedJWT, IDecodedObject} from "../../../Services/Resources/Interfaces/IDecodedJWT"
import { IApplicationMiddleware } from "../../Configs/Interfaces/IApplicationMiddleware"
import UnauthorizedException from "../HttpExceptions/UnauthorizedException"
import { Constants } from "../../../Constants"

class AuthMiddleware implements IApplicationMiddleware {
  public intercepter(req: IApplicationRequest, res: Response, next: NextFunction): NextFunction | Response | void {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedException(Constants.ErrorMessages.auth.tokenNotProvided)
      }

      const parts = authHeader.split(" ")
      const isValid = parts.length === 2

      if (!isValid) {
        throw new UnauthorizedException(Constants.ErrorMessages.auth.invalidToken)
      }

      const [scheme, token] = parts
      const pattern = /Bearer/i
      const test = pattern.test(scheme)

      if (!test) {
        throw new UnauthorizedException(Constants.ErrorMessages.auth.invalidToken)
      }

      jwt.verify(token, String(process.env.AUTH_SECRET), (err, decoded: IDecodedJWT): void => {
        if (err) {
          throw new UnauthorizedException(Constants.ErrorMessages.auth.expiredToken)
        }

        const decodedObject = decoded as IDecodedObject

        req.userId = decodedObject.id
        next()
      })

      jwt.verify(token, String(process.env.AUTH_SECRET), (err, decoded): void => { })

    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}

export default new AuthMiddleware().intercepter
