const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const Discussion = require('../models/discussion')
const Comment = require('../models/comment')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})
  await Discussion.deleteMany({})
  await Comment.deleteMany({})

  response.status(204).end()
})

module.exports = router
