const express = require('express')
const Product = require('../schemas/product')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

router.get('/product', async (req, res) => {
  const products = await Product.find()

  complete(() => res.send(products), res)
})

router.get('/product/:id', async (req, res) => {
  let product = await Product.findById(req.params.id).populate('reviews')

  complete(() => res.send(product), res)
})

router.post('/product', async (req, res) => {
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

module.exports = router