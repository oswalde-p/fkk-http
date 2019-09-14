const net = require ('net')

const response = 'ok'
class Server  {
  constructor(port = 7777) {
    this.port = port
    this.router = {
      GET: {},
      POST: {}
    }
    this.server = net.createServer((socket) => {
      console.log('connected')
    socket.on('end', () => 'connection closed')
    socket.on('data', (data) => {
      console.log(`Received: ${data}`)
      const {method, path, protocol} = isHttpRequest(data)
      if (protocol) {
        const handler = this.router[method][path]
        if (!handler) {
          socket.write(`Cannot ${method} ${path}`)
        } else {
          socket.write(handler())
        }
        socket.end()
      } else {
        socket.write(`You said: "${data}"\r\n> `)
      }
    })
  })
    this.server.on('error', (error) => console.log(error))
  }

  listen()  {
    this.server.listen(this.port, () => console.log(`Listening on port ${this.port}`))
  }

  get(path, handler) {
    this.router.GET[path] = handler
  }

}

const isHttpRequest = (data) => {
  const firstLine = data.toString('utf8').split('\r\n')[0]
  if (!firstLine) return false
  const [method, path, protocol] = firstLine.split(' ')
  if (protocol == 'HTTP/1.1') {
    return { method, path, protocol }
  }
}

const METHODS = {
  GET: 'GET',
  POST: 'POST'
}


module.exports = { Server }
