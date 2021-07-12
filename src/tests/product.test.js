const request = require('supertest')
const app = require('../app')
const Product = require('../schemas/product')
const { productOne, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('Products', () => {
  test('', () => {
    expect(true).toBe(true)
  })

  test('Add a new product', async () => {
    const res = await request(app).post('/product').send(productOne).expect(200)

    const product = await Product.findById(res.body._id)

    expect(product).not.toBeNull()
    expect(res.body.name).toEqual('Chair')
  })
  test('Gets all products', async () => {
    const res = await Product.find()

    expect(res.length).toEqual(1)
  })
})
