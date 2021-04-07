const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(201).json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    ...body,
    createdAt: new Date(),
    userType: 'client',
    passwordHash
  })

  // console.log('USER TO SAVE: ', user)
  const savedUser = await user.save()
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(201).json({
    token,
    username: savedUser.username,
    name: savedUser.name,
    isRegisteredNew: true,
  })
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(reques.params.id)
  response.status(204).end()
})

module.exports = usersRouter