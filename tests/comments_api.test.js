const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Discussion = require('../models/discussion')
const Comment = require('../models/comment')

describe('Before we make any comments in the database', () => {
  beforeEach(async () => {
    await Comment.deleteMany({})
  })

  test('There are no comments', async () => {
    const response = await api.get('/api/comments')
    expect(response.body).toHaveLength(0)
  })
})

describe('Now, let us test comments logic', () => {
  beforeEach(async () => {
    await Discussion.deleteMany({})
    await Comment.deleteMany({})
    const discussions = new Discussion({ ...helper.discussions[0] })
    await discussions.save()
  })

  test('Post a comment on a discussion', async () => {
    const allDiscussions = await helper.discussionsInDB()
    const discussionToComment = allDiscussions[0]
    const discussionId = discussionToComment.id

    expect(discussionToComment.comments.length).toBe(0)
    const newComment = {
      discussion: discussionId,
      ...helper.comment,
    }

    const resToCommentDisc = await api
      .post('/api/comments')
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(resToCommentDisc.body.discussion).toBe(discussionId)
    const discussionAfterComment = await Discussion.findById(discussionId)
    expect(discussionAfterComment.comments).toHaveLength(1)
    const allComments = await helper.commentsInDB()
    expect(allComments.length).toBe(1)
  })

  test('Edit the comment on a discussion', async () => {
    const allDiscussions = await helper.discussionsInDB()
    const discussionToComment = allDiscussions[0]
    const discussionId = discussionToComment.id

    const newComment = {
      discussion: discussionId,
      ...helper.comment,
    }

    const resToCommentDisc = await api
      .post('/api/comments')
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const editedComment = {
      ...resToCommentDisc.body,
      content: 'changed content',
    }
    const response = await api
      .put(`/api/comments/${editedComment.id}`)
      .send(editedComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.content).toContain('changed content')
  })

  test('Reply to a comment', async () => {
    const allDiscussions = await helper.discussionsInDB()
    const discussionToComment = allDiscussions[0]
    const discussionId = discussionToComment.id
    const newComment = {
      discussion: discussionId,
      ...helper.comment,
    }
    const response = await api
      .post('/api/comments')
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const comment = response.body
    const repliedComment = { ...comment, replies: comment.replies.concat(helper.reply) }
    const responseToEdit = await api
      .post(`/api/comments/${repliedComment.id}/replies`)
      .send(repliedComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(responseToEdit.body.replies).toHaveLength(comment.replies.length + 1)
  })

  test('We can delete the comment', async () => {
    const allDiscussions = await helper.discussionsInDB()
    const discussionToComment = allDiscussions[0]
    const discussionId = discussionToComment.id

    const newComment = {
      discussion: discussionId,
      ...helper.comment,
    }
    const response = await api
      .post('/api/comments')
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const commentToDelete = response.body

    const allCommentsBefore = await helper.commentsInDB()

    await api.delete(`/api/comments/${commentToDelete.id}`).expect(204)

    const allCommentsAfter = await helper.commentsInDB()

    expect(allCommentsAfter).toHaveLength(allCommentsBefore.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
