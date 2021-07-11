try {
  var mongoose = require('mongoose')
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require'),
    mongoose = prequire('mongoose')
}

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
if (process.env.STAGE === 'test') {
  const prod =
    'mongodb+srv://Cicero:Bigfoot3248@cluster0.hzjza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  const test = 'mongodb://127.0.0.1:27017/mollaTinker'

  mongoose.connect(test, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

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
