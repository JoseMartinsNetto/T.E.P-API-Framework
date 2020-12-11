import ISignupRequest from "./Resources/Interfaces/Request/ISignupRequest"
import IAuthRequest from "./Resources/Interfaces/Request/IAuthRequest"
import IGenerateTokenParams from "./Resources/Interfaces/IGenerateTokenParams"
import IEmailRequest from "./Resources/Interfaces/IEmailRequest"
import IResetPasswordRequest from "./Resources/Interfaces/Request/IResetPasswordRequest"

import bcryptjs from "bcryptjs"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { EmailService } from "./EmailService"
import { User } from "../Domain/Models/User"
import BadRequestException from "../Application/Http/HttpExceptions/BadRequestException"
import UnauthorizedException from "../Application/Http/HttpExceptions/UnauthorizedException"
import NotFoundException from "../Application/Http/HttpExceptions/NotFoundException"
import { BaseService } from "./BaseService"
import { Constants } from "../Constants"
import { getRepository, Repository } from "typeorm"
import IAuthResponse from "./Resources/Interfaces/Response/IAuthResponse"

export class UserService extends BaseService {
  constructor(private repository: Repository<User>, public emailService: EmailService) {
    super()
  }

  static instance() {
    return new UserService(getRepository(User), EmailService.instance())
  }

  private generateToken(params: IGenerateTokenParams): string {
    return jwt.sign(params, String(process.env.AUTH_SECRET), { expiresIn: process.env.TOKEN_EXPIRES })
  }

  private userExists(userData: ISignupRequest): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject): Promise<void> => {
      try {
        const { email } = userData

        let user = await this.repository.findOne({ where: { email } })

        if (user) {
          return resolve(true)
        }

        return resolve(false)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public signup(userData: ISignupRequest): Promise<IAuthResponse> {
    return new Promise<IAuthResponse>(async (resolve, reject): Promise<void> => {
      try {
        const { password } = userData
        const userExists = await this.userExists(userData)

        if (userExists) {
          throw new BadRequestException(Constants.ErrorMessages.users.userExists)
        }

        if (!userData.userType) {
          userData.userType = "staff"
        }

        const hash = await bcryptjs.hash(password, 10)
        userData.password = hash

        const user = this.repository.create(userData)
        const token = this.generateToken({ id: user.id })

        user.password = undefined

        return resolve({ user, token })
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public createUser(userData: ISignupRequest): Promise<User[]> {
    return new Promise<User[]>(async (resolve, reject): Promise<void> => {
      try {
        const { password } = userData
        const userExists = await this.userExists(userData)

        if (userExists) {
          throw new BadRequestException(Constants.ErrorMessages.users.userExists)
        }

        const hash = await bcryptjs.hash(password, 10)
        userData.password = hash

        const user = this.repository.create(userData)

        user.password = undefined

        const users = await this.getUsers()

        return resolve(users)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public editUser(userId: number, userData: ISignupRequest): Promise<User[]> {
    return new Promise<User[]>(async (resolve, reject): Promise<void> => {
      try {
        const user = await this.repository.findOne(userId)

        await this.repository.update(userId, userData)

        const users = await this.getUsers()

        return resolve(users)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public async authenticate(loginData: IAuthRequest): Promise<IAuthResponse> {
    return new Promise<IAuthResponse>(async (resolve, reject): Promise<void> => {
      try {
        const { email, password } = loginData

        let user = await this.repository.findOne({ where: { email } })

        if (!user) {
          throw new NotFoundException(Constants.ErrorMessages.users.userNotFound)
        }

        const isValid = await bcryptjs.compare(password, user.password)

        if (!isValid) {
          throw new UnauthorizedException(Constants.ErrorMessages.auth.invalidPassword)
        }

        const token = this.generateToken({ id: user.id })

        user.password = undefined

        return resolve({ user, token })
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public forgotPassword(email: string): Promise<IEmailRequest> {
    return new Promise<IEmailRequest>(async (resolve, reject): Promise<void> => {
      try {
        const user = await this.repository.findOne({ where: { email } })

        if (!user) {
          throw new NotFoundException(Constants.ErrorMessages.users.userNotFound)
        }

        const token = crypto.randomBytes(20).toString("hex")

        const now = new Date()
        now.setHours(now.getHours() + 1)

        user.passwordResetToken = token
        user.passwordResetExpires = now

        await this.repository.update(user.id, user)

        const msgUrl = `${process.env.FRONT_URL}/reset-password/token/${encodeURIComponent(token)}/email/${encodeURIComponent(user.email)}`

        const msg = await this.emailService.sendMail({
          to: user.email,
          from: "",
          subject: "Esqueceu Sua Senha?",
          html: `<p>Email de Recuperação de senha, clique no link abaixo para recuperar sua senha:</p>
          <p><a href="${msgUrl}">${msgUrl}</a></p>`
        })
        return resolve(msg)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public resetPassword(data: IResetPasswordRequest): Promise<void> {
    return new Promise<void>(async (resolve, reject): Promise<void> => {
      try {
        const { email, password, token } = data
        const user = await this.repository.findOne({ where: { email } })

        if (!user) {
          throw new NotFoundException(Constants.ErrorMessages.users.userNotFound)
        }

        if (token !== user.passwordResetToken) {
          throw new BadRequestException(Constants.ErrorMessages.auth.invalidResetToken)
        }

        const now = new Date()

        if (now > user.passwordResetExpires) {
          throw new BadRequestException(Constants.ErrorMessages.auth.invalidResetToken)
        }

        const newPassword = await bcryptjs.hash(password, 10)

        user.password = newPassword

        this.repository.update(user.id, user)

        return resolve()
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public getUsers(): Promise<User[]> {
    return new Promise<User[]>(async (resolve, reject): Promise<void> => {
      try {
        const users = await this.repository.find()
        return resolve(users)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public getUser(id: number): Promise<User> {
    return new Promise<User>(async (resolve, reject): Promise<void> => {
      try {
        const user = await this.repository.findOne({ where: { id } })
        return resolve(user)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }
}
