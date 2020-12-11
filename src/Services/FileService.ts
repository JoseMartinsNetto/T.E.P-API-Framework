import { Constants } from "./../Constants"
import fs from "fs"
import { LogService } from "./LogService"
import { File } from "../Domain/Models/File"
import NotFoundException from "../Application/Http/HttpExceptions/NotFoundException"
import { BaseService } from "./BaseService"
import IFileRequest from "./Resources/Interfaces/Request/IFileRequest"
import { getRepository, Repository } from "typeorm"

export class FileService extends BaseService {

  constructor(private repository: Repository<File>) {
    super()
  }

  static instance() {
    return new FileService(getRepository(File))
  }

  public saveFromUpload(fileRequest: IFileRequest): Promise<File> {
    return new Promise<File>(async (resolve, reject): Promise<void> => {
      try {
        const file = this.repository.create(fileRequest)
        return resolve(file)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public getAll(): Promise<File[]> {
    return new Promise<File[]>(async (resolve, reject): Promise<void> => {
      try {
        const files = await this.repository.find()
        return resolve(files)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public async delete(id: number): Promise<void> {
    return new Promise<void>(async (resolve, reject): Promise<void> => {
      try {
        const file = await this.repository.findOne({ where: { id } })

        if (!file) {
          throw new NotFoundException(Constants.ErrorMessages.files.notfound)
        }

        await this.repository.delete(id)

        return resolve()
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public saveStringIntoFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject): void => {
      try {
        fs.writeFile(path, content, function (err): void {
          if (err) return reject(err)

          LogService.logIntoConsole(`THE FILE ${path} WAS SAVED!`)

          return resolve()
        })
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }
}
