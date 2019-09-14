const { Server } = require('./lib/server')
const { Response } = require('./lib/server/response')

const server = new Server()

server.get('/ping', () =>  new Response(200, 'OK'))
server.listen()
