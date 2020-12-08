import InternalServerErrorException from '../Application/Http/HttpExceptions/InternalServerErrorException'
import HttpExceptionBase from '../Application/Http/HttpExceptions/HttpExceptionBase'

export default class BaseService {
  public handleError (error) {
    if (error instanceof HttpExceptionBase) {
      return error
    }

    return new InternalServerErrorException(`Internal Server Error -> ${String(error)}`)
  }
}
