const express = require('express')
const Product = require('../schemas/product')

const router = new express.Router()

router.get('/product', async (req, res) => {
  try {
    const products = await Product.find()

    res.send(products)
  } catch (err) {
    res.status(404).send()
  }
})

router.post('/product', async (req, res) => {
  const product = await Product(req.body)

  try {
    await product.save()
    res.send(product)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

router.delete('/product/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) res.status(404).send('No Products Found')

  try {
    res.send(product)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

router.patch('/product/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const forbiddenUpdates = ['createdAt', 'updatedAt', '_id']
  const isValidOperation = updates.every(
    update => !forbiddenUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  const product = await Product.findById(req.params.id)
  if (!product) res.status(404).send('No Products Found')

  try {
    updates.forEach(update => (product[update] = req.body[update]))

    await product.save()
    res.send(product)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

module.exports = router
