const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Discussion = require('../models/discussion')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('discussion', { author: 1 })
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
  // console.log('BODY: ', comment)
  const savedComment = await comment.save()
  discussion.comments = discussion.comments.concat(savedComment._id)
  await discussion.save()
  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter
