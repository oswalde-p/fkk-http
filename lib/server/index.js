const net = require ('net')
const { Response } = require('./response')

class Server  {
  constructor() {
    this.router = {
      GET: {},
      POST: {}
    }
    this.server = net.createServer((socket) => {
      console.log('connected')
    socket.on('end', () => 'connection closed')
    socket.on('data', (data) => {
      console.log(`Received: ${data}`)
      const {method, path, protocol, headers } = parseHttp(data)
      if (protocol) {
        try {
          const handler = this.router[method][path]
          let response = null
          if (!handler) {
            response = new Response(404, `Cannot ${method} ${path}`)
          } else {
            if (method == METHODS.GET) {
              response = handler()
            } else if (method == METHODS.POST) {
              const params = getParams(data, headers['Content-Type'])
              response = handler(params)
            }
          }
          socket.write(response.toHttp())
          socket.end()
        } catch (err) {
          const res = new Response(500, err.message)
          console.log(res)
          socket.write(res.toHttp())
          socket.end()
        }
      } else {
        socket.write(`You said: "${data}"\r\n> `)
      }
    })
  })
    this.server.on('error', (error) => console.log(error))
  }

  listen(port = 7777)  {
    this.server.listen(port, () => console.log(`Listening on port ${port}`))
  }

  get(path, handler) {
    this.router.GET[path] = handler
  }

  post(path, handler) {
    this.router.POST[path] = handler
  }

}

const parseHttp = (data) => {
  const [firstLine, ...headersArray] = data.toString('utf8').split('\r\n')
  if (!firstLine) return false
  const [method, path, protocol] = firstLine.split(' ')
  if (protocol == 'HTTP/1.1') {
    const headers = {}
    headersArray.forEach((h) => {
      const [name, value] = h.split(': ')
      if(name) headers[name] = value
    })
    return { method, path, protocol, headers }
  }
}

const getParams = (data, contentType) => {
  console.log(contentType)
  if (contentType != 'application/json') {
    throw new Error(`Unknown Content-Type: ${contentType}`)
  }
  return 'helloooo'
}

const METHODS = {
  GET: 'GET',
  POST: 'POST'
}


module.exports = { Server }
