const mongoose = require('mongoose')

const productId = new mongoose.Types.ObjectId()
const productOne = {
  _id: productId,
  name: 'Chair',
  price: 17.99,
  sale: {
    price: 15.0,
    endTimestamp: new Date(),
  },
  categories: ['Tech', 'DIY'],
  summary:
    'Lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur Lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur ipsum dolor sit Lorem ipsum, dolor sit amet consectetur',
  modifier: [
    {
      name: 'sm',
      inventory: 2,
    },
    {
      name: 'lg',
      inventory: 5,
    },
  ],
  colors: ['#ffffff', '#bebebe', '#cccccc'],
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

const productTwo = {
  ...productOne,
  _id: new mongoose.Types.ObjectId(),
}

module.exports = {
  productOne,
  productId,
  productTwo,
}
