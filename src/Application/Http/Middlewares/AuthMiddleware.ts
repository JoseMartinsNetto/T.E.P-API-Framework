import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import ICustomRequest from '../../Configs/Interfaces/ICustomRequest'
import IDecodedJWT from '../../../Services/Resources/Interfaces/IDecodedJWT'
import IMiddleware from '../../Configs/Interfaces/IMiddleware'
import UnauthorizedException from '../HttpExceptions/UnauthorizedException'

class AuthMiddleware implements IMiddleware {
  public intercepter (req: ICustomRequest, res: Response, next: NextFunction): NextFunction | Response | void{
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Token de autenticação não fornecido!' })
      }

      const parts = authHeader.split(' ')
      const isValid = parts.length === 2

      if (!isValid) {
        throw new UnauthorizedException({ message: 'Token de autenticação inválido ou mal formatado!' })
      }

      const [scheme, token] = parts
      const pattern = /Bearer/i
      const test = pattern.test(scheme)

      if (!test) {
        throw new UnauthorizedException({ message: 'Token de autenticação inválido ou mal formatado!' })
      }

      jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: IDecodedJWT): void => {
        if (err) {
          throw new UnauthorizedException({ message: 'Token de autenticação inválido ou expirado!' })
        }

        req.userId = decoded.id
        next()
      })
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}

export default new AuthMiddleware().intercepter
