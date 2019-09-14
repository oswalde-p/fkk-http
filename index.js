const { Server } = require('./lib/server')

const server = new Server()

server.get('/ping', () =>  'ok')
server.listen()
