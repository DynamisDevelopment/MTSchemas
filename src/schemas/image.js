const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image
