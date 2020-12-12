import SendGrid from "@sendgrid/mail"
import IEmailRequest from "./Resources/Interfaces/IEmailRequest"
import { BaseService } from "./BaseService"

export class EmailService extends BaseService {
  constructor(public sendGrid: typeof SendGrid) {
    super()
  }

  static instance() {
    return new EmailService(SendGrid)
  }

  public async sendMail(data: IEmailRequest) {
    return new Promise<IEmailRequest>(async (resolve, reject) => {
      try {
        this.sendGrid.setApiKey(String(process.env.SENDGRID_API_KEY))

        if (!data.from) {
          data.from = String(process.env.DEFAULT_EMAIL_SENDER)
        }

        await this.sendGrid.send(data)
        return resolve(data)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }
}