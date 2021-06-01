const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  response.status(201).send({
    token,
    username: user.username,
    name: user.name,
    id: user.id,
    imageURL: user.imageURL,
    imageID: user.imageID,
    userType: user.userType,
  })
})

loginRouter.put('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const passwordCorrect = user === null ? false : await bcrypt.compare(request.body.oldPassword, user.passwordHash)
  if (passwordCorrect) {
    return response.status(401).json({ error: 'Invalid password' })
  }
  const saltRounds = 10
  const newPasswordHash = await bcrypt.hash(request.body.newPassword, saltRounds)
  const newPasswordUser = {
    ...request.user,
    updatedAt: new Date(),
    passwordHash: newPasswordHash,
  }
  await User.findByIdAndUpdate(decodedToken.id, newPasswordUser, {
    new: false,
  })
    .then(updatedUser => updatedUser.toJSON())
    .then(savedAndUpdatedUser => {
      response.status(201).json(savedAndUpdatedUser)
    })
})

module.exports = loginRouter
