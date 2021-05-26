const discussionsRouter = require('express').Router()
const Discussion = require('../models/discussion')

discussionsRouter.get('/', async (request, response) => {
  const discussions = await Discussion.find({}).populate('comments', {
    replies: 1,
    author: 1,
    content: 1,
    createdAt: 1,
  })
  response.status(201).json(discussions.map(discussion => discussion.toJSON()))
})

discussionsRouter.post('/', async (request, response) => {
  const body = request.body
  const discussion = new Discussion({
    ...body,
    likes: body.likes || 0,
    dislikes: body.dislikes || 0,
  })
  console.log('BODY: ', discussion)
  const savedDiscussion = await discussion.save()
  response.status(201).json(savedDiscussion.toJSON())
})

module.exports = discussionsRouter
