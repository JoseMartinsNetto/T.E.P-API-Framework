
import HttpExceptionBase from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class BadRequestException extends HttpExceptionBase {
  public constructor (message: string) {
    super(message)
    this.code = HttpCodes.BAD_REQUEST
    this.exceptionType = 'Bad Request Exception'
  }
}

export default BadRequestException
