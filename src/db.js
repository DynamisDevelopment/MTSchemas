try {
  var mongoose = require('mongoose')
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require'),
    mongoose = prequire('mongoose')
}

const mongooseConnect = async url =>
  mongoose.connect(
    `mongodb://127.0.0.1:27017/${url ? url : process.env.MONGODB_URL}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )

module.exports = {
  mongooseConnect,
}
