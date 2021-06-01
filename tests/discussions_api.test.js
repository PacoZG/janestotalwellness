const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Discussion = require('../models/discussion')
const Comment = require('../models/comment')

describe('Before we load any discussions in the database', () => {
  beforeEach(async () => {
    await Discussion.deleteMany({})
  })

  test('There are no discussions', async () => {
    const response = await api.get('/api/discussions')
    expect(response.body).toHaveLength(0)
  })
})

describe('Now, let us test discussions logic', () => {
  beforeEach(async () => {
    await Discussion.deleteMany({})
    await Comment.deleteMany({})
    const discussions = new Discussion({ ...helper.discussions[0] })
    await discussions.save()
  })

  test('Test that we can post a discussion and has likes = 0', async () => {
    const allDiscussionsBefore = await helper.discussionsInDB()
    expect(allDiscussionsBefore).toHaveLength(1)
    const newDiscussion = {
      userId: '609507e4e56b7b19b0c8f21d',
      topic: 'Exercise',
      author: 'Paco',
      title: 'I want to know more about Lorem',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting indus...',
    }
    const response = await api
      .post('/api/discussions')
      .send(newDiscussion)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const discussionAfter = await helper.discussionsInDB()
    expect(discussionAfter).toHaveLength(allDiscussionsBefore.length + 1)
    expect(response.body.likes).toBe(0)
  })

  test('We can edit a discussion', async () => {
    const newDiscussion = helper.newDiscussion
    const disc_resp = await api
      .post('/api/discussions')
      .send(newDiscussion)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const editedDiscussion = {
      ...disc_resp.body,
      content: 'changed content',
    }

    const response = await api
      .put(`/api/discussions/${editedDiscussion.id}`)
      .send(editedDiscussion)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.content).toContain('changed content')
  })

  test('We can delete a discussion', async () => {
    const newDiscussion = helper.newDiscussion
    const disc_resp = await api
      .post('/api/discussions')
      .send(newDiscussion)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allDiscussionsBefore = await helper.discussionsInDB()

    await api.delete(`/api/discussions/${disc_resp.body.id}`).expect(204)

    const allDiscussionsAfter = await helper.discussionsInDB()

    expect(allDiscussionsAfter).toHaveLength(allDiscussionsBefore.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
