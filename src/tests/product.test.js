const request = require('supertest')
const app = require('../app')
const Product = require('../schemas/product')
const { productId, reviewId, productTwo, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('Products', () => {
  test('Add a new product', async () => {
    const res = await request(app).post('/product').send(productTwo).expect(200)

    const product = await Product.findById(res.body._id)

    expect(product).not.toBeNull()
    expect(res.body.name).toEqual('Chair')
  })

  test('Gets all products', async () => {
    const res = await Product.find()

    expect(res.length).toEqual(1)
  })

  test('Gets specific product and populates reviews', async () => {
    const res = await Product.find()

    expect(res.length).toEqual(1)
    expect(res[0].reviews[0]._id).toEqual(reviewId)
  })

  test('Delete Product', async () => {
    await request(app).delete(`/product/${productId}`).expect(200)

    const products = await Product.find()
    expect(products.length).toEqual(0)
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
