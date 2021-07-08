const Product = require('../product')

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

test('Creates Valid Model', () => {
  const product = new Product(productOne).validateSync()
  expect(product).toBe(undefined)
})
