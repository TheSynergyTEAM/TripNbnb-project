const express = require('express')
const config = require('./config/env')
const app = express()
const { port } = config

const randRange = (min, max) => Math.floor(Math.random() * (max - min)) + min

app.use(express.json())

app.post('/users/login', (req, res) => {
  console.log(req.body)
  res.status(200).end()
})

app.get('/places/:id', (req, res) => {
  const { id } = req.params

  const fakeRating = () => (Math.random() * 5).toFixed(1)
  const fakeReviewCount = () => Math.floor(Math.random() * 100) + 1
  const randImageCount = randRange(0, 100)
  const thumbnailImageCount = randRange(0, 5)
  const images = []
  const thumbnailImages = []

  for (let i = 0; i < randImageCount; i++) {
    images.push(`https://picsum.photos/80/80?random=${i}`)
  }

  for (let i = 0; i < thumbnailImageCount; i++) {
    thumbnailImages.push(`https://picsum.photos/350/200?random=${i}`)
  }

  setTimeout(() => {
    // send dummy data after a second
    res.send({
      id,
      rating: fakeRating(),
      review_count: fakeReviewCount(),
      images,
      thumbnailImages,
      reviews: []
    })
  }, 1000)
})

app.listen(port, () => {
  console.log(`started server on http://localhost:${port}`)
})
