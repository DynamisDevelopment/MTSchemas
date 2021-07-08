const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
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
            if (val.split(' ').length < 25) throw new Error()
          },
          message: () => `Summary must be at least 25 words long`,
        },
      ],
    },
    modifier: [
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
    Categories: [String],
    pictures: {
      type: [Buffer],
      // required: true,
    },
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
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
