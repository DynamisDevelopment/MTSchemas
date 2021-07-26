const mongoose = require('mongoose')

const reviewId = new mongoose.Types.ObjectId()
const reviewOne = {
  _id: reviewId,
  title: 'This is the coolest product ever!',
  body: '--------------------',
  score: 5,
}

const reviewTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'This product sucks and made my wife leave me!',
  body: '--------------------',
  score: 2,
}

module.exports = {
  reviewId,
  reviewOne,
  reviewTwo,
}
