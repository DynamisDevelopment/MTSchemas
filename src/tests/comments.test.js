const request = require('supertest')
const app = require('../app')
const Comment = require('../schemas/comment')
const { postId, commentId, commentTwo, setupDatabase } = require('./utils/db')

beforeEach(setupDatabase)

describe('comments', () => {
  test('Add a new comment', async () => {
    const res = await request(app)
      .post(`/post/${postId}/comment`)
      .send(commentTwo)
      .expect(200)

    const comment = await Comment.findById(res.body._id)

    expect(comment).not.toBeNull()
  })

  test('Gets all comments', async () => {
    const res = await Comment.find()

    expect(res.length).toEqual(1)
  })

  test('Deletes comment', async () => {
    await request(app).delete(`/comment/${commentId}`).expect(200)

    const comment = await Comment.findById(commentId)
    expect(comment).toBeNull()
  })

  test('Updates comment', async () => {
    const title = 'I changed my mind'
    const res = await request(app)
      .patch(`/comment/${commentId}`)
      .send({
        title,
      })
      .expect(200)

    expect(res.body.title).toEqual(title)
  })
})
