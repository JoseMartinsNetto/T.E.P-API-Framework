
import HttpExceptionBase from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class InternalServerErrorException extends HttpExceptionBase {
  public constructor (message: string) {
    super(message)
    this.code = HttpCodes.SERVER_ERROR
    this.exceptionType = 'Internal ServerError Exception'
  }
}

export default InternalServerErrorException
