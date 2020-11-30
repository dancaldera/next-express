const express = require('express')
const next = require('next')

const port = 5000
// const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const routes = require('./routes')

  server.use('/api', routes(server))

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
