const express = require('express')
const mongoose = require('mongoose')
const Review = require('../schemas/review')
const Product = require('../schemas/product')

const router = new express.Router()

router.get('/reviews', async (req, res) => {
  const reviews = await Review.find().populate({
    path: 'owner',
    model: 'Product',
  })

  try {
    res.send(reviews)
  } catch (err) {
    res.status(404).send()
  }
})

router.post('/product/:id/review', async (req, res) => {
  const review = await Review({
    ...req.body,
    owner: req.params.id,
  })
  const product = await Product.findById(req.params.id)

  try {
    product.reviews.push(review)
    await review.save()
    await product.save()
    res.send(review)
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send(err)
  }
})

router.delete('/review/:id', async (req, res) => {
  const review = await review.findByIdAndDelete(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  try {
    res.send(review)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

router.patch('/review/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const forbiddenUpdates = ['createdAt', 'updatedAt', '_id']
  const isValidOperation = updates.every(
    update => !forbiddenUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  const review = await review.findById(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  try {
    updates.forEach(update => (review[update] = req.body[update]))

    await review.save()
    res.send(review)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

module.exports = router
