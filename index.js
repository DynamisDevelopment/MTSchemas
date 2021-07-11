const mongoose = require('mongoose')
const app = require('./app')

// * Schemas
const product = require('./schemas/product')
const post = require('./schemas/post')

// * Connect to DB
const prod =
  'mongodb+srv://Cicero:Bigfoot3248@cluster0.hzjza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const test = 'mongodb://127.0.0.1:27017/mollaTinker'

mongoose.connect(test, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`running on port: ${port}`))

module.exports = {
  product,
  post,
}
