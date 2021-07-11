const express = require('express')

// * Routes
const productRouter = require('./routes/products')
const reviewRouter = require('./routes/reviews')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')

// * Setup For Local Testing
const app = express()

app.use(express.json())
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)
app.use(commentRouter)

module.exports = app
