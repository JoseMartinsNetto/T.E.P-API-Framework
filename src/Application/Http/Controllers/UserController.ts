import { Response } from "express"
import { UserService } from "../../../Services/UserService"
import HttpCodes from "../HttpCodes"
import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"

export class UserController {
  constructor(private service: UserService) { }

  static instance() {
    return new UserController(UserService.instance())
  }
  public async index(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const users = await this.service.getUsers()
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async store(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const users = await this.service.createUser(req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async edit(req: IApplicationRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const users = await this.service.editUser(Number(id), req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}