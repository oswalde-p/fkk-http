
class Response {
  constructor(status, content, contentType) {
    this.status = status
    this.content = content
    this.contentType = contentType
  }

  toHttp() {
    const statusLine = `HTTP/1.1 ${this.status} ${reasonPhrase[this.status]}`
    const headers = this.getHeaders()
    return `${statusLine}\r\n${headers}\r\n\r\n${this.content}`
  }

  getHeaders() {
    return `Date: ${new Date()}\r\n` +
    `Content-length: ${Buffer.byteLength(this.content, 'utf8')}\r\n` +
    `Content-type: ${contentTypes[this.contentType] || 'text'}\r\n` +
    `X-Powered-By: jason\r\n`
  }
}

const reasonPhrase = {
  '200': 'OK',
  '404': 'Bad request',
  '500': 'Internal server error'
}

const contentTypes = {
  'html': 'text/html; charset=utf-8'
}

module.exports = { Response }
