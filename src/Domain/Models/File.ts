import { Schema, model } from 'mongoose'
import IFile from '../Interfaces/IFile'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const FileSchema = new Schema<IFile>({
  name: String,
  size: String,
  key: String,
  url: String
}, {
  timestamps: true
})

FileSchema.pre<IFile>('remove', function (): Promise<void> {
  return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'public', 'files', this.key))
})

export default model<IFile>('File', FileSchema)
