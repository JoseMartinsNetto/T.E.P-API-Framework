import Jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"
import { IApplicationMiddleware } from "../../Configs/Interfaces/IApplicationMiddleware"
import UnauthorizedException from "../HttpExceptions/UnauthorizedException"
import { Constants } from "../../../Constants"
import { DecodedJWT, DecodedObject } from "../../../Services/Resources/Utils/JWTDecoding"

export class AuthMiddleware implements IApplicationMiddleware {
  constructor(private jwt: typeof Jwt) { }

  static instance() {
    return new AuthMiddleware(Jwt)
  }

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

      this.jwt.verify(token, String(process.env.AUTH_SECRET), (err, decoded: DecodedJWT): void => {
        if (err) {
          throw new UnauthorizedException(Constants.ErrorMessages.auth.expiredToken)
        }

        const decodedObject = decoded as DecodedObject

        req.userId = decodedObject.id
        next()
      })

    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}
