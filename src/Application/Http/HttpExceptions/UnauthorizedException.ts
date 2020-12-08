import HttpExceptionBase from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class UnauthorizedException extends HttpExceptionBase {
  public constructor (message: string) {
    super(message)
    this.code = HttpCodes.UNAUTHORIZED
    this.exceptionType = 'Unauthorized Exception'
  }
}

export default UnauthorizedException
