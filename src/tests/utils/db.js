const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')
const Product = require('../../schemas/product')
const Review = require('../../schemas/review')
const Post = require('../../schemas/post')
const Comment = require('../../schemas/comment')

const productId = new mongoose.Types.ObjectId()
const productOne = {
  _id: productId,
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
      name: 'sm',
      inventory: 2,
    },
    {
      name: 'lg',
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

const productTwo = {
  ...productOne,
  _id: new mongoose.Types.ObjectId(),
}

const reviewId = new mongoose.Types.ObjectId()
const reviewOne = {
  _id: reviewId,
  title: 'This is the coolest product ever!',
  body: '--------------------',
  score: 5,
}

const reviewTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'This product sucks and made my wife leave me!',
  body: '--------------------',
  score: 2,
}

const postId = new mongoose.Types.ObjectId()
const postOne = {
  _id: postId,
  title: 'How we do this thing',
  caption: 'Maybe you can learn to do this thing too?',
  categories: 'travel',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At repellat, soluta ullam, adipisci possimus alias numquam, veniam nisi facere quas unde ratione? Vel minus maiores atque vitae molestiae, perspiciatis sequi?',
  afterthought: 'Some other things',
  meta: {
    keywords: ['travel', 'diy'],
  },
}

const postTwo = {
  ...postOne,
  _id: new mongoose.Types.ObjectId(),
  title: "Don't listen to us, we don't know what we're doing",
}

const commentId = new mongoose.Types.ObjectId()
const commentOne = {
  _id: commentId,
  name: 'John Johnson',
  body: 'Instructions not clear, got dick stuck in toaster.',
}

const commentTwo = {
  ...commentOne,
  _id: new mongoose.Types.ObjectId(),
  title: 'Nevermind, I got it out...',
}

const setupDatabase = async () => {
  await Product.deleteMany({})
  await Review.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})
  await new Product(productOne).save()
  await request(app).post(`/product/${productId}/review`).send(reviewOne)
  await new Post(postOne).save()
  await request(app).post(`/post/${postId}/comment`).send(commentOne)
}

module.exports = {
  productOne,
  productId,
  productTwo,
  reviewOne,
  reviewId,
  reviewTwo,
  postId,
  postTwo,
  commentId,
  commentTwo,
  setupDatabase,
}
