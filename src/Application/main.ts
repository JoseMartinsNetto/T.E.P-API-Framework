import Server from './Server'
import App from './App'

const server = new Server({
  App,
  port: process.env.PORT || 3333,
  appUrl: process.env.APP_URL || 'http://localhost'
})

server.run()
