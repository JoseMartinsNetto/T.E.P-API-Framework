import HttpExceptionBase from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class ForbiddenException extends HttpExceptionBase {
  public constructor (message: string) {
    super(message)
    this.code = HttpCodes.FORBIDDEN
    this.exceptionType = 'Forbidden Exception'
  }
}

export default ForbiddenException
