const mongoose = require('mongoose')
const { wordLength } = require('../utils')

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (wordLength(val, 20, true)) throw new Error()
        },
        message: () => 'Bit long there bucko!',
      },
    },
    body: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (wordLength(val, 500, true)) throw new Error('')
        },
        message: () => "Give it up bro, she's not gonna send you feet pics.",
      },
    },
    image: Buffer,
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
