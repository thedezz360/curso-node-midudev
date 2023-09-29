const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()

// desactivamos la cabeceara x-powered-by
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

// middleware
app.use((req, res, next) => {
  console.log(req.headers)
  if (req.method !== 'POST') return next()

  if (req.headers['content-type'] !== 'application/json') return next()
  console.log('middleware')

  // solo llegan request que son POST y que tienen el header Content-Type: application/json

  let body = ''
  // escuchamos el evento data
  // chunk -> trozo
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // ahora no respondemos si no que mutamos la request y
    // metemos la informacion en el req.body
    console.log(data)
    req.body = data

    next()
  })
})

// cada vez que recivimos una peticion get en la ruta especifica
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // ahora hacemos esto en el middleware

  // let body = ''
  // // escuchamos el evento data
  // // chunk -> trozo
  // req.on('data', (chunk) => {
  //   body += chunk.toString()
  // })

  // req.on('end', () => {
  //   const data = JSON.parse(body)
  //   res.status(201).json(data)
  // })

  console.log(req.body)
  res.status(201).json(req.body)
})

// para todas las peticiones que no hayan coincidido con las rutas anteriores
app.use((req, res) => {
  res.status(404).send('<h1> 404 not found </h1>')
})

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`)
})
