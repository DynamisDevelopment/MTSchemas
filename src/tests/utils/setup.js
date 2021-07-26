const request = require('supertest')
const app = require('../../app')

// * Schemas
const Product = require('../../schemas/product')
const Review = require('../../schemas/review')
const Post = require('../../schemas/post')
const Comment = require('../../schemas/comment')

// * Mocks
const { commentOne, commentTwo, commentId } = require('./mockComments')
const { productOne, productTwo, productId } = require('./mockProducts')
const { reviewOne, reviewTwo, reviewId } = require('./mockReviews')
const { postOne, postTwo, postId } = require('./mockPosts')
const { userOne, userTwo, userId } = require('./mockUsers')

const setupDatabase = async () => {
  await Product.deleteMany({})
  await Review.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})

  await new Product(productOne).save()
  await request(app).post(`/product/${productId}/review`).send(reviewOne)
  await request(app)
    .post(`/product/${productId}/images`)
    .attach('picture', `${__dirname}/assets/waifus.jpg`)
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
  postOne,
  postId,
  postTwo,
  commentOne,
  commentId,
  commentTwo,
  userOne,
  userTwo,
  userId,
  setupDatabase,
}
