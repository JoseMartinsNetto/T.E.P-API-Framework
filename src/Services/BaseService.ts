import InternalServerErrorException from "../Application/Http/HttpExceptions/InternalServerErrorException"
import HttpExceptionBase from "../Application/Http/HttpExceptions/HttpExceptionBase"

export abstract class BaseService {
  public handleError(error: any) {
    if (error instanceof HttpExceptionBase) {
      return error
    }

    return new InternalServerErrorException(`Internal Server Error -> ${String(error)}`)
  }
}
