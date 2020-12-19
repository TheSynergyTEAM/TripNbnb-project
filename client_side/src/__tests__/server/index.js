const express = require('express')
const config = require('./config/env')
const app = express()
const { port } = config

app.use(express.json())

app.post('/api/login', (req, res) => {
  console.log(req.body)
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`started server on http://localhost:${port}`)
})
