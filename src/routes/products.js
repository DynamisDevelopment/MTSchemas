const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Product = require('../schemas/product')
const Image = require('../schemas/image')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

const picture = multer({
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

router.get('/product', async (req, res) => {
  const products = await Product.find()

  complete(() => res.send(products), res)
})

router.get('/product/:id', async (req, res) => {
  let product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    model: 'Review',
  })

  complete(() => res.send(product), res)
})

router.post('/product', picture.array('picture'), async (req, res) => {
  const product = await Product(req.body)

  complete(async () => {
    await product.save()
    res.send(product)
  }, res)
})

router.post(
  '/product/:id/images',
  picture.array('picture'),
  async (req, res) => {
    const product = await Product.findById(req.params.id)

    complete(async () => {
      req.files.forEach(async (image, i) => {
        const buffer = await sharp(image.buffer)
          .resize({ width: 350, height: 350 })
          .png()
          .toBuffer()

        const newImage = await Image({ image: buffer, owner: req.params.id })
        newImage.save()
        product.pictures.push(`/images/product/${newImage.id}`)

        console.log(i, req.files.length)
        if (i + 1 === req.files.length) {
          await product.save()
          res.send(product)
        }
      })
    }, res)
  }
)

router.get('/images/product/:id', async (req, res) => {
  let image = await Image.findById(req.params.id)

  complete(() => {
    if (!image) throw new Error('No Image Found')

    res.set('Content-Type', 'image/png')
    res.send(image.image)
  }, res)
})

router.delete('/product/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) res.status(404).send('No Products Found')

  complete(() => res.send(product), res)
})

router.patch('/product/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, ['createdAt', 'updatedAt', '_id'])

  const product = await Product.findById(req.params.id)
  if (!product) res.status(404).send('No Products Found')

  complete(async () => {
    updates.forEach(update => (product[update] = req.body[update]))

    await product.save()
    res.send(product)
  }, res)
})

module.exports = router
