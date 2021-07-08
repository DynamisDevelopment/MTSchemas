const express = require('express')
const Review = require('../schemas/review')
const Product = require('../schemas/product')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

router.get('/reviews', async (req, res) => {
  const reviews = await Review.find().populate({
    path: 'owner',
    model: 'Product',
  })

  complete(() => res.send(reviews), res)
})

router.post('/product/:id/review', async (req, res) => {
  const review = await Review({
    ...req.body,
    owner: req.params.id,
  })
  const product = await Product.findById(req.params.id)

  complete(async () => {
    product.reviews.push(review)
    await review.save()
    await product.save()
    res.send(review)
  }, res)
})

router.delete('/review/:id', async (req, res) => {
  const review = await review.findByIdAndDelete(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  complete(() => res.send(review), res)
})

router.patch('/review/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, ['createdAt', 'updatedAt', '_id'])

  const review = await review.findById(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  complete(async () => {
    updates.forEach(update => (review[update] = req.body[update]))

    await review.save()
    res.send(review)
  }, res)
})

module.exports = router
