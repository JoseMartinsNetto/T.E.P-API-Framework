// import { Response } from "express"
// import UserService from "../../../Services/UserService"
// import HttpCodes from "../HttpCodes"
// import { IApplicationRequest } from "../../Configs/Interfaces/IApplicationRequest"

// class AuthController {
//   public async signup(req: IApplicationRequest, res: Response): Promise<Response> {
//     try {
//       const user = await UserService.signup(req.body)
//       return res.status(HttpCodes.CREATED).json(user)
//     } catch (error) {
//       return res.status(error.code).json(error)
//     }
//   }

//   public async authenticate(req: IApplicationRequest, res: Response): Promise<Response> {
//     try {
//       const user = await UserService.authenticate(req.body)
//       return res.status(HttpCodes.OK).json(user)
//     } catch (error) {
//       return res.status(error.code).json(error)
//     }
//   }

//   public async forgotPassword(req: IApplicationRequest, res: Response): Promise<Response> {
//     try {
//       const { email } = req.body

//       await UserService.forgotPassword(email)

//       return res.status(HttpCodes.NO_CONTENT).send()
//     } catch (error) {
//       return res.status(error.code).json(error)
//     }
//   }

//   public async resetPassword(req: IApplicationRequest, res: Response): Promise<Response> {
//     try {
//       await UserService.resetPassword(req.body)

//       return res.status(HttpCodes.OK).json({ message: "Senha alterada com sucesso!" })
//     } catch (error) {
//       return res.status(error.code).json(error)
//     }
//   }
// }
// export default new AuthController()
