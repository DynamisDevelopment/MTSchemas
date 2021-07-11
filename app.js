const express = require('express')

// * Routes
const productRouter = require('./routes/products')
const reviewRouter = require('./routes/reviews')
const postRouter = require('./routes/posts')

// * Setup For Local Testing
const app = express()

app.use(express.json())
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)

module.exports = app
