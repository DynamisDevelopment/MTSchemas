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
  const product = new Product(req.body)

  try {
    await product.save()
    res.send(product)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

router.delete('/product', async (req, res) => {
  const product = new Product.findById(req.body)

  try {
    await product.save()
    res.send(product)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

module.exports = router
