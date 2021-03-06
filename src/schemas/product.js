const mongoose = require('mongoose')
const Review = require('./review')
const Asset = require('./asset')
const { wordLength } = require('../utils')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'How will they find it, dummy?'],
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      default: 0.0,
      required: true,
      validate: {
        validator: val => {
          if (val === 0) throw new Error()
        },
        message: () => "We're not running a charity here, bucko!",
      },
    },
    sale: {
      price: {
        type: Number,
      },
      endTimestamp: {
        type: Date,
      },
    },
    summary: {
      type: String,
      required: [
        true,
        'Please add something somehting short but descriptive, more details in the description.',
      ],
      trim: true,
      validate: [
        {
          validator: val => {
            if (wordLength(val, 20)) throw new Error()
          },
          message: () => `Summary must be at least 20 words long`,
        },
      ],
    },
    sizes: [
      {
        name: {
          type: String,
          enum: ['sm', 'md', 'lg', 'xl'],
          required: true,
        },
        inventory: {
          type: Number,
          default: 0.0,
          required: true,
        },
      },
    ],
    colors: [
      {
        type: [String],
        validate: {
          validator: val => {
            const hex = /[0-9A-Fa-f]{6}/g
            const res = hex.test(val)
            if (!res) throw new Error()
          },
          message: () => `Please input a valid Hex value`,
        },
      },
    ],
    categories: [String],
    assets: [String],
    social: {
      facebook: String,
      twitter: String,
      instagram: String,
      pintrest: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    additionalInformation: {
      type: String,
      required: true,
      trim: true,
    },
    shippingReturns: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Review',
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

ProductSchema.pre('findOneAndDelete', async function (next) {
  const product = this.getQuery()
  await Review.deleteMany({ owner: product._id })
  await Asset.deleteMany({ owner: product._id })
  next()
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
