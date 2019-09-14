const fs = require('fs')
const { Server } = require('./lib/server')
const { Response } = require('./lib/server/response')

const server = new Server()

server.get('/ping', () =>  new Response(200, 'OK'))
server.get('/', () => new Response(200, fs.readFileSync('./index.html'), 'html'))
server.listen()
