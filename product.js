const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      //todo Add Validation
      //   validate(val) {
      //     if (val < 18) throw new Error('Must be an adult')
      //   },
    },
    age: {
      type: Number,
      default: 0.0,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      //todo check if min 25 words
      // validate(val) {

      // }
    },
    modifierOne: {
      type: [String],
      //todo check if valid option
      // validate(val) {

      // }
    },
    modifierTwo: {
      type: [String],
      //todo check if valid option
      // validate(val) {

      // }
    },
    color: {
      type: [String],
      //todo check if valid color
      // validate(val) {

      // }
    },
    // todo add Categories schema
    // Categories: [Categories]
    pictures: {
      type: [Buffer],
      //todo check if valid buffer data
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

userSchema.methods.toJSON = function () {
  const user = this

  const userObj = user.toObject()
  delete userObj.password
  delete userObj.tokens
  delete userObj.avatar

  return userObj
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'ThisIsMySecret324@!')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('No User Found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Password not valid')

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8)

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
