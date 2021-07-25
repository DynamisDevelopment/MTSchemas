const request = require('supertest')
const app = require('../app')
const Product = require('../schemas/product')
const Review = require('../schemas/review')
const Image = require('../schemas/asset')
const { productId, productTwo, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('Products', () => {
  test('Add a new product', async () => {
    const res = await request(app).post('/product').send(productTwo).expect(200)

    const product = await Product.findById(res.body._id)

    expect(product).not.toBeNull()
    expect(res.body.name).toEqual('Chair')
  })

  test('Add Image to Product', async () =>
    await request(app)
      .post(`/product/${productId}/images`)
      .attach('picture', `${__dirname}/utils/assets/waifus.jpg`)
      .expect(200))

  test('Gets all products', async () => {
    const res = await Product.find()

    expect(res.length).toEqual(1)
  })

  test('Gets specific product and populates reviews', async () => {
    const res = await request(app).get(`/product/${productId}`).expect(200)

    const score = res.body.reviews[0].score
    expect(score).toEqual(5)
  })

  test('Delete Product and related Reviews and Images', async () => {
    await request(app).delete(`/product/${productId}`).expect(200)

    const reviews = await Review.find({ owner: productId })
    const images = await Image.find({ owner: productId })
    expect(reviews.length).toEqual(0)
    expect(images.length).toEqual(0)
  })

  test('Updates Product', async () => {
    const res = await request(app)
      .patch(`/product/${productId}`)
      .send({
        name: 'Stool',
      })
      .expect(200)

    expect(res.body.name).toEqual('Stool')
  })
})
