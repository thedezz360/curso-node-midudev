const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')
const PORT = 3000

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json ; charset=utf8')
          // pasamos el json a string
          return res.end(JSON.stringify(dittoJSON))
        case '/about':
          res.setHeader('Content-Type', 'text/html ; charset=utf8')
          return res.end('<h1>About</h1>')
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'charset= utf8 ; text/html')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // escuchamos el evento data
          // chunk -> trozo
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, {
              'Content-Type': 'Application/json; charset=utf8'
            })
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'charset= utf8 ; text/html')
          return res.end('<h1>404</h1>')
      }
  }
}
const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
