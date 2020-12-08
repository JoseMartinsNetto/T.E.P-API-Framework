import { Response } from 'express'
import UserService from '../../../Services/UserService'
import HttpCodes from '../HttpCodes'
import ICustomRequest from '../../Configs/Interfaces/ICustomRequest'

class UserController {
  public async index (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const users = await UserService.getUsers()
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async store (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const users = await UserService.createUser(req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }

  public async edit (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const users = await UserService.editUser(id, req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error)
    }
  }
}

export default new UserController()
