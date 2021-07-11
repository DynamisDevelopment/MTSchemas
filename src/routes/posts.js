const express = require('express')
const Post = require('../schemas/post')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

const postOne = {
  title: 'How we do this thing',
  caption: 'Maybe you can learn to do this thing too?',
  categories: 'travel',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At repellat, soluta ullam, adipisci possimus alias numquam, veniam nisi facere quas unde ratione? Vel minus maiores atque vitae molestiae, perspiciatis sequi?',
  afterthought: 'Some other things',
  meta: {
    keywords: ['travel', 'diy'],
  },
}
router.get('/post', async (req, res) => {
  const posts = await Post.find()

  complete(() => res.send(posts), res)
})

router.get('/post/:id', async (req, res) => {
  let post = await Post.findById(req.params.id).populate('reviews')

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

module.exports = router
