const express = require('express')
const config = require('./config/env')
const app = express()
const { port } = config

app.use(express.json())

app.post('/users/login', (req, res) => {
  console.log(req.body)
  res.status(200).end()
})

app.get('/places/:id', (req, res) => {
  const { id } = req.params

  const fakeRating = () => (Math.random() * 5).toFixed(1)
  const fakeReviewCount = () => Math.floor(Math.random() * 100) + 1

  setTimeout(() => {
    // send dummy data after a second
    res.send({ id, rating: fakeRating(), review_count: fakeReviewCount() })
  }, 1000)
})

app.listen(port, () => {
  console.log(`started server on http://localhost:${port}`)
})
