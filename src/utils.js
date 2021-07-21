const multer = require('multer')
const sharp = require('sharp')
const Asset = require('./schemas/asset')

const sendErr = (res, err, shouldLog) => {
  if (shouldLog) console.log(err)
  res.status(400).send(err)
}

const complete = (callback, res, shouldLog) => {
  try {
    callback()
  } catch (err) {
    sendErr(res, err, shouldLog)
  }
}

const allowedUpdates = (body, res, allowedUpdates) => {
  const updates = Object.keys(body)
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })
}

const forbiddenUpdates = (body, res, forbiddenUpdates) => {
  const updates = Object.keys(body)
  const isValidOperation = updates.every(
    update => !forbiddenUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })
}

const wordLength = (val, number, greaterThan) => {
  if (greaterThan)
    return val.split(' ').length > number && val.split('&nbsp;').length > number
  else
    return val.split(' ').length < number && val.split('&nbsp;').length < number
}

const assetInit = () =>
  multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      const allowedTypes = ['jpg', 'jpeg', 'png']
      let valid

      allowedTypes.forEach(type => {
        if (file.originalname.endsWith(type)) valid = true
      })

      if (!valid) cb(new Error('Please use a jpg, jpeg, or png file format'))

      cb(undefined, true)
    },
  })

const saveAssets = (req, res, schema) =>
  req.files.forEach(async (image, i) => {
    const buffer = await sharp(image.buffer)
      .resize({ width: 350, height: 350 })
      .png()
      .toBuffer()

    const newImage = await Asset({ asset: buffer, owner: req.params.id })
    newImage.save()
    schema.assets.push(`images/${newImage.id}`)

    if (i + 1 === req.files.length) {
      await schema.save()
      res.send(schema)
    }
  })

module.exports = {
  sendErr,
  complete,
  allowedUpdates,
  forbiddenUpdates,
  wordLength,
  assetInit,
  saveAssets,
}
