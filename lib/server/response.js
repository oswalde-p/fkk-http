
class Response {
  constructor(status, content) {
    this.status = status
    this.content = content
  }

  toHttp() {
    const statusLine = `HTTP/1.1 ${this.status} ${reasonPhrase[this.status]}`
    const headers = this.getHeaders()
    return `${statusLine}\r\n${headers}\r\n\r\n${this.content}`
  }

  getHeaders() {
    return `Date: ${new Date()}\r\nContent-length: ${Buffer.byteLength(this.content, 'utf8')}`
  }
}

const reasonPhrase = {
  '200': 'OK',
  '404': 'Bad request'
}

module.exports = { Response }
