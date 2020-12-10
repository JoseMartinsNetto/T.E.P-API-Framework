import { ConnectionOptions, createConnection } from "typeorm"

class DatabaseConnection {
  public async connect(options: ConnectionOptions) {
    return createConnection(options)
  }
}

export default new DatabaseConnection()
