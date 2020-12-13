import { User } from "../../../../Domain/Models/User";

export default interface IAuthResponse {
  user: User
  token: string
}
