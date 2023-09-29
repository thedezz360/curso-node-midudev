const http = require('node:http')
const fs = require('node:fs')

const desirePort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf8')
  if (req.url === '/') {
    res.statusCode = 200 // ok
    res.end('pagína de inicio')
  } else if (req.url === '/imagen.jpg') {
    fs.readFile('./zoro.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> 500 Internal Server Error <h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'img/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('contacto')
  } else {
    res.statusCode = 404
    res.end('404')
  }
}

const server = http.createServer(processRequest)

server.listen(desirePort, () => {
  console.log(`server listening on port http://localhost:${desirePort}`)
})
