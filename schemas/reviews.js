const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
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
          if (val.split(' ').lenght >= 1000) throw new Error('')
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
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
