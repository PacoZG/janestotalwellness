const discussionsRouter = require('express').Router()
const Discussion = require('../models/discussion')
const Comment = require('../models/comment')

discussionsRouter.get('/', async (request, response) => {
  const discussions = await Discussion.find({}).populate('comments', { discussion: 1 })
  response.status(201).json(discussions.map(discussion => discussion.toJSON()))
})

discussionsRouter.post('/', async (request, response) => {
  const { body } = request
  const discussion = new Discussion({
    ...body,
    likes: body.likes || 0,
    dislikes: body.dislikes || 0,
  })
  const savedDiscussion = await discussion.save()
  response.status(201).json(savedDiscussion.toJSON())
})

discussionsRouter.get('/:id', async (request, response) => {
  const discussion = await Discussion.findById(request.params.id)
  if (!discussion) {
    response.status(404).end()
  }
  response.json(discussion.toJSON())
})

discussionsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const discussion = {
    topic: body.topic,
    author: body.author,
    title: body.title,
    content: body.content,
    likes: body.likes,
    dislikes: body.dislikes,
  }
  await Discussion.findByIdAndUpdate(request.params.id, discussion, { new: true })
    .then(updatedDiscussion => updatedDiscussion.toJSON())
    .then(savedAndUpdatedDiscussion => {
      response.status(201).json(savedAndUpdatedDiscussion)
    })
})

discussionsRouter.delete('/:id', async (request, response) => {
  const discussion = await Discussion.findById(request.params.id)
  if (discussion.comments.length > 0) {
    discussion.comments.map(async comment => await Comment.findByIdAndDelete(comment._id))
  }
  await Discussion.findByIdAndDelete(request.params.id)
  response.status(204).json().end()
})

module.exports = discussionsRouter
