const mongoose = require('mongoose')
const { wordLength } = require('../utils')

const ReviewSchema = new mongoose.Schema(
  {
    title: {
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
          if (wordLength(val, 1000, true)) throw new Error('')
        },
        message: () => "We don't need your autobiography, Karen...",
      },
    },
    score: {
      type: Number,
      required: true,
      validate: {
        validator: val => {
          if (val < 0.5 || val > 5) throw new Error('')
        },
        message: () => 'Invalid score',
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Needs a Product'],
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
