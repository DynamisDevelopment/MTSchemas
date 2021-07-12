const app = require('./app')

// * Schemas
const product = require('./schemas/product')
const post = require('./schemas/post')
const review = require('./schemas/review')
const comment = require('./schemas/post')

// * Routes
const productRouter = require('./routes/products')
const reviewRouter = require('./routes/reviews')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')

// * Connect to DB
if (process.env.STAGE === 'test' || 'dev') {
  const port = process.env.PORT || 4001

  app.listen(port, () => console.log(`running on port: ${port}`))
}

module.exports = {
  product,
  post,
  review,
  comment,
  productRouter,
  reviewRouter,
  postRouter,
  commentRouter,
  mongoose,
}
