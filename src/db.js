try {
  var mongoose = require('mongoose')
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require'),
    mongoose = prequire('mongoose')
}

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
