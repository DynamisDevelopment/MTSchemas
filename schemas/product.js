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
      validate(val) {
        if (val === 0)
          throw new Error("We're not running a charity here, bucko!")
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
          required: true,

          //todo check if valid option
          // validate(val) {

          // }
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
    // todo add Categories schema
    // Categories: [Categories]
    pictures: {
      type: [Buffer],
      //todo check if valid buffer data
      //todo check if at least 1 image
      // validate(val) {

      // }
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

// productSchema.methods.toJSON = function () {
//   const product = this

//   const productObj = product.toObject()
//   delete productObj.password
//   delete productObj.tokens
//   delete productObj.avatar

//   return productObj
// }

// productSchema.methods.generateAuthToken = async function () {
//   const product = this
//   const token = jwt.sign({ _id: product._id.toString() }, 'ThisIsMySecret324@!')

//   product.tokens = product.tokens.concat({ token })
//   await product.save()

//   return token
// }

// productSchema.statics.findByCredentials = async (email, password) => {
//   const product = await product.findOne({ email })
//   if (!product) throw new Error('No product Found')

//   const isMatch = await bcrypt.compare(password, product.password)
//   if (!isMatch) throw new Error('Password not valid')

//   return product
// }

// productSchema.pre('save', async function (next) {
//   const product = this

//   if (product.isModified('password'))
//     product.password = await bcrypt.hash(product.password, 8)

//   next()
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product
