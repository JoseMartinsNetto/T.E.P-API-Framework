import { Document } from 'mongoose'

export default interface IFile extends Document {
    name: string
    size: number
    key: string
    url: string
    createdAt: Date
    updatedAt: Date
}
