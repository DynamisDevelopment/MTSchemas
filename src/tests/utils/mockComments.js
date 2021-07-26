const mongoose = require('mongoose')

const commentId = new mongoose.Types.ObjectId()
const commentOne = {
  _id: commentId,
  name: 'John Johnson',
  body: 'Instructions not clear, got dick stuck in toaster.',
}

const commentTwo = {
  ...commentOne,
  _id: new mongoose.Types.ObjectId(),
  title: 'Nevermind, I got it out...',
}

module.exports = {
  commentId,
  commentOne,
  commentTwo,
}
