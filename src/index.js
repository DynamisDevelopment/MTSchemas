const app = require('./app')
const { mongooseConnect } = require('./db')
const utils = require('./utils')

// * Schemas
const Product = require('./schemas/product')
const Post = require('./schemas/post')
const Review = require('./schemas/review')
const Comment = require('./schemas/comment')

// * Routes
const productRouter = require('./routes/products')
const reviewRouter = require('./routes/reviews')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')

// * Utils
const mocks = require('./tests/utils/db')

// * Connect to DB
if (process.env.STAGE === 'dev') {
  const port = process.env.PORT || 4001

  app.listen(port, () => console.log(`running on port: ${port}`))
}

module.exports = {
  Product,
  Post,
  Review,
  Comment,
  productRouter,
  reviewRouter,
  postRouter,
  commentRouter,
  mongooseConnect,
  ...utils,
  ...mocks,
}
