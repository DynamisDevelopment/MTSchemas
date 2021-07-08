const express = require('express')
const mongoose = require('mongoose')

// * Schemas
const product = require('./schemas/product')
const post = require('./schemas/post')

// * Routes
const productRouter = require('./routes/products')

// * Connect to DB
const prod =
  'mongodb+srv://Cicero:Bigfoot3248@cluster0.hzjza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const test = 'mongodb://127.0.0.1:27017/mollaTinker'

mongoose.connect(test, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// * Setup For Local Testing
const app = express()

app.use(express.json())
app.use(productRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`running on port: ${port}`))

module.exports = {
  product,
  post,
}
