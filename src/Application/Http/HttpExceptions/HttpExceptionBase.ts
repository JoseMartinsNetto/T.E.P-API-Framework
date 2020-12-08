export default class HttpExceptionBase {
    public code: number
    public message: string
    public exceptionType: string

    public constructor (message : string) {
      this.message = message
    }
}
