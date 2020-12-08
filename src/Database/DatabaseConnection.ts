import mongoose from 'mongoose'

class DatabaseConnection {
  public async connect (): Promise<string> {
    try {
      await mongoose.connect(process.env.STRING_CONNECTION, {
        useNewUrlParser: true
      })
      return `MongoBd '${process.env.MONGODB_DATABASE_NAME}' database connected!`
    } catch (error) {
      return `Error while trying to connect a database -> ${error}`
    }
  }
}

export default new DatabaseConnection()
