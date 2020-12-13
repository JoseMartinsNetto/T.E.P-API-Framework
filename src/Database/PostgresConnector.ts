import { ConnectionOptions, createConnection } from "typeorm"

class PostgresConnector {
  public async connect(options: ConnectionOptions) {
    return createConnection(options)
  }
}

export default new PostgresConnector()
