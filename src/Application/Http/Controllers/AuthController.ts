import { Response } from "express"
import { UserService } from "../../../Services/UserService"
import HttpCodes from "../HttpCodes"
import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"

export class AuthController {
  constructor(public userService: UserService) { }

  static instance() {
    return new AuthController(UserService.instance())
  }

  public async signup(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const user = await this.userService.signup(req.body)
      return res.status(HttpCodes.CREATED).json(user)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async authenticate(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const user = await this.userService.authenticate(req.body)
      return res.status(HttpCodes.OK).json(user)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async forgotPassword(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      await this.userService.forgotPassword(email)

      return res.status(HttpCodes.NO_CONTENT).send()
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async resetPassword(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      await this.userService.resetPassword(req.body)

      return res.status(HttpCodes.OK).json({ message: "Senha alterada com sucesso!" })
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}
