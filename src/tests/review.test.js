const request = require('supertest')
const app = require('../app')
const Review = require('../schemas/review')
const { productId, reviewId, reviewTwo, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('reviews', () => {
  test('Add a new review', async () => {
    const res = await request(app)
      .post(`/product/${productId}/review`)
      .send(reviewTwo)
      .expect(200)

    const review = await Review.findById(res.body._id)

    expect(review).not.toBeNull()
    expect(res.body.score).toEqual(2)
  })

  test('Gets all reviews', async () => {
    const res = await Review.find()

    expect(res.length).toEqual(1)
  })

  test('Deletes review', async () => {
    await request(app).delete(`/review/${reviewId}`).expect(200)

    const review = await Review.findById(reviewId)
    expect(review).toBeNull()
  })

  test('Updates review', async () => {
    const title = 'I changed my mind'
    const res = await request(app)
      .patch(`/review/${reviewId}`)
      .send({
        title,
      })
      .expect(200)

    expect(res.body.title).toEqual(title)
  })
})
