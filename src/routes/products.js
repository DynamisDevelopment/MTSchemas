const express = require('express')
const slugify = require('slugify')
const Product = require('../schemas/product')
const {
  complete,
  forbiddenUpdates,
  assetInit,
  saveAssets,
} = require('../utils')

const router = new express.Router()
const asset = assetInit()

router.get('/product', async (req, res) => {
  const products = await Product.find()

  const hasImages = products.filter(product => product.assets.length > 0)
  complete(() => res.send(hasImages), res)
})

router.get('/product/:id', async (req, res) => {
  let product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    model: 'Review',
  })

  complete(() => {
    if (!product || product.assets.length === 0)
      throw new Error('No Product Found')
    res.send(product)
  }, res)
})

router.post('/product', async (req, res) => {
  let categories = []
  req.body.categories.forEach(category => categories.push(slugify(category)))
  req.body.categories = categories
  const product = await Product(req.body)

  complete(async () => {
    await product.save()
    res.send(product)
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

router.post('/product/:id/images', asset.array('picture'), async (req, res) => {
  const product = await Product.findById(req.params.id)

  complete(() => saveAssets(req, res, product), res)
})

module.exports = router
