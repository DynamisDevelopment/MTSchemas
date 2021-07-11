const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Product = require('../schemas/product')

const productOne = {
  name: 'Chair',
  price: 17.99,
  sale: {
    price: 15.0,
    endTimestamp: new Date(),
  },

  summary:
    'Lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur Lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur ipsum dolor sit Lorem ipsum, dolor sit amet consectetur',
  modifier: [
    {
      name: 'Small',
      inventory: 2,
    },
    {
      name: 'Large',
      inventory: 5,
    },
  ],
  colors: ['#ffffff', '#bebebe', '#cccccc'],
  //   pictures: [
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmikeandmikesorganics.com%2Fwp-content%2Fuploads%2F2015%2F09%2FBananass-large.jpg&f=1&nofb=1',
  //   ],
  social: {
    facebook: 'https:',
    pintrest: 'https:',
  },
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi eaque vero',
  additionalInformation:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi eaque vero',
  shippingReturns:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi eaque vero',
}

// beforeEach(async () => {
//   await Product.deleteMany()
//   await new Product(productOne).save
// })

describe('Products', () => {
  test('', () => {
    expect(true).toBe(true)
  })

  test('Add a new product', async () => {
    const productTwo = {
      ...productOne,
      name: 'Stool',
    }
    const res = await request(app).post('/product').send(productTwo).expect(200)
    const product = await User.findById(res.body.product._id)

    expect(product).not.toBeNull()
    expect(res.body.name).toEqual('Stool')
  })
})
