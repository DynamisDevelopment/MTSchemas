const request = require('supertest')
const app = require('../app')
const Post = require('../schemas/post')
const { postId, postTwo, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('posts', () => {
  test('Add a new post', async () => {
    const res = await request(app).post(`/post`).send(postTwo).expect(200)

    const post = await Post.findById(res.body._id)

    expect(post).not.toBeNull()
  })

  test('Gets all posts', async () => {
    const res = await Post.find()

    expect(res.length).toEqual(1)
  })

  test('Deletes post', async () => {
    await request(app).delete(`/post/${postId}`).expect(200)

    const post = await Post.findById(postId)
    expect(post).toBeNull()
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
})
