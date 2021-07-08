const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (val.split(' ').lenght >= 20) throw new Error()
        },
        message: () => 'Bit long there bucko!',
      },
    },
    body: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (val.split(' ').lenght >= 500) throw new Error('')
        },
        message: () => "Give it up bro, she's not gonna send you feet pics.",
      },
    },
    helpful: {
      type: Number,
      default: 0,
    },
    unhelpful: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
