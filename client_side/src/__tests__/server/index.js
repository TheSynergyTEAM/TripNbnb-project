const express = require('express')
const config = require('./config/env')
const app = express()
const cors = require('cors')
const { port } = config

const randRange = (min, max) => Math.floor(Math.random() * (max - min)) + min
const ratings = []

for (let i = 0; i <= 5; i += 0.5) {
  ratings.push(i)
}

// 아무 말
const lorem = [
  '국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.',
  '국교는 인정되지 아니하며, 종교와 정치는 분리된다. 피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는 기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때 또는 정식재판에 있어서 피고인의 자백이 그에게 불리한 유일한 증거일 때에는 이를 유죄의 증거로 삼거나 이를 이유로 처벌할 수 없다.',
  '국무총리는 국무위원의 해임을 대통령에게 건의할 수 있다. 위원은 정당에 가입하거나 정치에 관여할 수 없다.',
  '선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다.'
]

app.use(cors())
app.use(express.json())

app.post('/users/login', (req, res) => {
  console.log(req.body)
  res.status(200).end()
})

app.post('/users/unlink', (req, res) => {
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
  const reviews = { data: [], meta: {} }

  for (let i = 0; i < randImageCount; i++) {
    images.push(`https://picsum.photos/80/80?random=${i}`)
  }

  for (let i = 0; i < thumbnailImageCount; i++) {
    thumbnailImages.push(`https://picsum.photos/350/200?random=${i}`)
  }

  const reviewCount = randRange(0, 11)

  for (let i = 0; i < reviewCount; i++) {
    // 리뷰 내용
    const content = lorem[randRange(0, lorem.length)]
    const rating = ratings[randRange(0, ratings.length)]
    const createdAt = randRange(
      new Date(Date.now() - 86400000).getTime(),
      Date.now()
    )
    const user = {
      avatar: `https://picsum.photos/30/30?random=${i}`,
      name: 'blah blah'
    }

    reviews.data.push({ content, createdAt, rating, user })
  }

  reviews.meta.review_average =
    reviews.data.length &&
    (
      reviews.data.reduce((pre, cur) => (pre += cur.rating), 0) /
      reviews.data.length
    ).toFixed(1)

  setTimeout(() => {
    // send dummy data after a second
    res.send({
      id,
      rating: fakeRating(),
      review_count: fakeReviewCount(),
      images,
      thumbnailImages,
      reviews
    })
  }, 1000)
})

app.listen(port, () => {
  console.log(`started server on http://localhost:${port}`)
})
