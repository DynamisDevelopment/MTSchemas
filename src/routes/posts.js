const express = require('express')
const Post = require('../schemas/post')
const {
  complete,
  forbiddenUpdates,
  assetInit,
  saveAssets,
} = require('../utils')

const router = new express.Router()
const asset = assetInit()

router.get('/post', async (req, res) => {
  const posts = await Post.find()

  complete(() => res.send(posts), res)
})

router.get('/post/:id', async (req, res) => {
  let post = await Post.findById(req.params.id).populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'replies',
      model: 'Comment',
    },
  })

  complete(() => res.send(post), res)
})

router.post('/post', async (req, res) => {
  const post = await Post(req.body)

  complete(async () => {
    await post.save()
    res.send(post)
  }, res)
})

router.delete('/post/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id)
  if (!post) res.status(404).send('No posts Found')

  complete(() => res.send(post), res)
})

router.patch('/post/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, ['createdAt', 'updatedAt', '_id'])

  const post = await Post.findById(req.params.id)
  if (!post) res.status(404).send('No posts Found')

  complete(async () => {
    updates.forEach(update => (post[update] = req.body[update]))

    await post.save()
    res.send(post)
  }, res)
})

router.get('/posts/categories', async (req, res) => {
  const posts = await Post.distinct('categories')

  complete(() => res.send(posts), res, true)
})

router.post(
  '/post/:id/bannerContent',
  asset.array('picture'),
  async (req, res) => {
    const post = await Post.findById(req.params.id)

    complete(() => saveAssets(req, res, post), res, true)
  }
)

module.exports = router
