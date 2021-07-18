const express = require('express')
const Post = require('../schemas/post')
const Comment = require('../schemas/comment')
const { complete, forbiddenUpdates } = require('../utils')

const router = new express.Router()

router.get('/post/:id/comments', async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'replies',
      model: 'Comment',
    },
  })

  complete(() => res.send(post.comments), res)
})

router.post('/post/:id/comment', async (req, res) => {
  const comment = await Comment({
    ...req.body,
    owner: req.params.id,
  })
  const post = await Post.findById(req.params.id)

  complete(async () => {
    post.comments.push(comment)
    await comment.save()
    await post.save()
    res.send(comment)
  }, res)
})

router.delete('/comment/:id', async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  if (!comment) res.status(404).send('No comments Found')

  complete(() => res.send(comment), res)
})

router.patch('/comment/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, ['createdAt', 'updatedAt', '_id'])

  const comment = await Comment.findById(req.params.id)
  if (!comment) res.status(404).send('No comments Found')

  complete(async () => {
    updates.forEach(update => (comment[update] = req.body[update]))

    await comment.save()
    res.send(comment)
  }, res)
})

module.exports = router
