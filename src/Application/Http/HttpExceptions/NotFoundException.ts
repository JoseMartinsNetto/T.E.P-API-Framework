import HttpExceptionBase from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class NotFoundException extends HttpExceptionBase {
  public constructor (message: string) {
    super(message)
    this.code = HttpCodes.NOT_FOUND
    this.exceptionType = 'Not Found Exception'
  }
}

export default NotFoundException
