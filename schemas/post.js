const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
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
          if (val.split(' ').length > 20) throw new Error()
        },
        message: () => 'Keep it brief!',
      },
    },
    thumbnails: {
      type: [Buffer],
      required: true,
    },
    categories: {
      type: String,
    },
    body: {
      type: String,
      required: true,
      validate: {
        validator: val => {
          if (val.split(' ').length < 25) throw new Error()
        },
        message: () => "Really, that's you're article? Try better.",
      },
    },
    afterthought: {
      type: String,
      validate: {
        validator: val => {
          if (val.split(' ').length < 150) throw new Error()
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
    //TODO Add Comments that connect to users
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
