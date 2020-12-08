import fs from 'fs'
import LogService from './LogService'
import IFile from '../Domain/Interfaces/IFile'
import File from '../Domain/Models/File'
import IFileRequest from './Resources/Interfaces/Request/IFileRequest'
import NotFoundException from '../Application/Http/HttpExceptions/NotFoundException'
import BaseService from './BaseService'

class FileService extends BaseService {
  public saveFromUpload (fileRequest: IFileRequest): Promise<IFile> {
    return new Promise<IFile>(async (resolve, reject): Promise<void> => {
      try {
        const file = await File.create(fileRequest)
        return resolve(file)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public getAll (): Promise<IFile[]> {
    return new Promise<IFile[]>(async (resolve, reject): Promise<void> => {
      try {
        const files = await File.find()
        return resolve(files)
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public async delete (fileId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject): Promise<void> => {
      try {
        const file = await File.findById(fileId)

        if (!file) {
          throw new NotFoundException('Arquivo Não encontrado')
        }

        await file.remove()

        return resolve()
      } catch (error) {
        return reject(this.handleError(error))
      }
    })
  }

  public saveStringIntoFile (path: string, content: string): Promise<void> {
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

export default new FileService()
