const mongoose = require('mongoose')
const Comment = require('./comment')
const { wordLength } = require('../utils')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    caption: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (wordLength(val, 20, true)) throw new Error()
        },
        message: () => 'Keep it brief!',
      },
    },
    // thumbnails: {
    //   type: [Buffer],
    //   required: true,
    // },
    categories: {
      type: [String],
    },
    body: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (wordLength(val, 25)) throw new Error()
        },
        message: () => "Really, that's you're article? Try better.",
      },
    },
    afterthought: {
      type: String,
      validate: {
        validator: val => {
          if (wordLength(val, 150, true)) throw new Error()
        },
        message: () => 'This is an afterthought not another article!',
      },
    },
    meta: {
      likes: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
      keywords: {
        type: [String],
        required: true,
      },
      published: {
        type: Boolean,
        default: false,
      },
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
)

PostSchema.pre('findOneAndDelete', async function (next) {
  const post = this.getQuery()
  await Comment.deleteMany({ owner: post._id })
  next()
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
