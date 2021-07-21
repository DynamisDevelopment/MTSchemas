const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema(
  {
    asset: {
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

const Asset = mongoose.model('Asset', AssetSchema)

module.exports = Asset
