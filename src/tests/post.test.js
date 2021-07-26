const request = require('supertest')
const app = require('../app')
const Post = require('../schemas/post')
const Comment = require('../schemas/comment')
const { postId, postTwo, commentTwo, setupDatabase } = require('./utils/setup')

beforeEach(setupDatabase)

describe('posts', () => {
  test('Add a new post', async () => {
    const res = await request(app).post(`/post`).send(postTwo).expect(200)

    const post = await Post.findById(res.body._id)

    expect(post).not.toBeNull()
  })

  test('Gets all posts', async () => {
    const res = await request(app).get(`/post`).expect(200)

    expect(res.body.length).toEqual(1)
  })

  test('Gets specific post and populates comments', async () => {
    const res = await request(app).get(`/post/${postId}`).expect(200)

    const name = res.body.comments[0].name
    expect(name).toEqual(commentTwo.name)
  })

  test('Deletes post', async () => {
    await request(app).delete(`/post/${postId}`).expect(200)

    const post = await Post.findById(postId)
    expect(post).toBeNull()
  })

  test('Delete Post and related Comments', async () => {
    await request(app).delete(`/post/${postId}`).expect(200)

    const comments = await Comment.find({ owner: postId })
    expect(comments.length).toEqual(0)
  })

  test('Updates post', async () => {
    const title = 'Some other title'
    const res = await request(app)
      .patch(`/post/${postId}`)
      .send({
        title,
      })
      .expect(200)

    expect(res.body.title).toEqual(title)
  })

  test('Gets all categories', async () => {
    const res = await request(app).get(`/posts/categories`).expect(200)

    expect(res.body.length).toEqual(1)
  })
})
