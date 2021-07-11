const express = require('express')
const Review = require('../schemas/review')
const Product = require('../schemas/product')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

router.get('/product/:id/reviews', async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    model: 'Review',
  })

  complete(() => res.send(product.review), res)
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
  const review = await Review.findByIdAndDelete(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  complete(() => res.send(review), res)
})

router.patch('/review/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, ['createdAt', 'updatedAt', '_id'])

  const review = await Review.findById(req.params.id)
  if (!review) res.status(404).send('No reviews Found')

  complete(async () => {
    updates.forEach(update => (review[update] = req.body[update]))

    await review.save()
    res.send(review)
  }, res)
})

module.exports = router
