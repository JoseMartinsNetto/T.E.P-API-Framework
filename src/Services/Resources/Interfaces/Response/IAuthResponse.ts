import IUser from '../../../../Domain/Interfaces/IUser'

export default interface IAuthResponse {
    user: IUser
    token: string
}
