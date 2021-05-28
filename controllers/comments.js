const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Discussion = require('../models/discussion')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.status(201).json(comments.map(comment => comment.toJSON()))
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const discussion = await Discussion.findById(body.discussion)
  const comment = new Comment({
    ...body,
    discussion: discussion._id,
    likes: body.likes || 0,
    dislikes: body.dislikes || 0,
  })
  const savedComment = await comment.save()
  discussion.comments = discussion.comments.concat(savedComment._id)
  await discussion.save()
  response.status(201).json(savedComment.toJSON())
})

commentsRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id)
  response.status(204).json().end()
})

commentsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const reply = {
    author: body.author,
    content: body.content,
    likes: body.likes,
    dislikes: body.dislikes,
    replies: body.replies,
  }
  await Comment.findByIdAndUpdate(request.params.id, reply, { new: true })
    .then(updatedComment => updatedComment.toJSON())
    .then(savedAndUpdatedComment => {
      response.status(201).json(savedAndUpdatedComment)
    })
})

commentsRouter.post('/:id/replies', async (request, response) => {
  const body = request.body
  const reply = {
    title: body.title,
    content: body.content,
    author: body.author,
    likes: body.likes,
    replies: body.replies,
  }
  Comment.findByIdAndUpdate(request.params.id, reply, { new: true })
    .then(updatedComment => updatedComment.toJSON())
    .then(savedAndUpdatedComment => {
      response.status(201).json(savedAndUpdatedComment)
    })
})

module.exports = commentsRouter
