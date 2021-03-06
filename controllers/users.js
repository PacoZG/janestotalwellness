const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1,
  })
  response.status(201).json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    ...body,
    createdAt: new Date(),
    userType: body.userType ? body.userType : 'admin',
    passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.status(201).json({
      username: savedUser.username,
      firstName: savedUser.firstName,
      isRegisteredNew: true,
    })
  } catch (error) {
    response.status(400).send(error)
  }
})

usersRouter.put('/:id', async (request, response) => {
  const { body } = request
  const user = {
    ...body,
    updatedAt: new Date(),
  }
  await User.findByIdAndUpdate(request.params.id, user, { new: true })
    .then(updatedUser => updatedUser.toJSON())
    .then(savedAndUpdatedUser => {
      response.status(201).json(savedAndUpdatedUser)
    })
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (!user) {
    response.status(400).end()
  }
  response.json(user.toJSON())
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
