const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  // console.log('BODY: ', body)
  const user = await User.findOne({ username: body.username })
  // console.log('USER_FOUND: ', user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  //console.log('PASSWORD: ', passwordCorrect)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(201)
    .send({ token, username: user.username, name: user.name, id: user.id, imageURL: user.imageURL, imageID: user.imageID, userType: user.userType })
})

loginRouter.put('/', async (request, response) => {
  const body = request.body
  //console.log('BODY: ', body)
  const decodedToken = jwt.verify(body.token, process.env.SECRET)
  //console.log('DECODED TOKEN: ', decodedToken.id)
  const user = await User.findById(decodedToken.id)
  //console.log('USER_FOUND: ', user)
  // verifying passord matching
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.oldPassword, user.passwordHash)
  //console.log('PASSWORD CORRECT: ', passwordCorrect)
  // if password is correct we proceed to update the user's password
  if (passwordCorrect) {
    const saltRounds = 10
    const newPasswordHash = await bcrypt.hash(body.newPassword, saltRounds)
    const newPasswordUser = {
      ...body.user,
      updatedAt: new Date(),
      passwordHash: newPasswordHash
    }
    //console.log('USER TO UPDATE PASSWORD: ', newPasswordUser)
    await User.findByIdAndUpdate(decodedToken.id, newPasswordUser, { new: false })
      .then(updatedUser => updatedUser.toJSON())
      .then(savedAndUpdatedUser => {
        response.status(201).json(savedAndUpdatedUser)
      })
  } else {
    return response.status(400).json({ error: 'Invalid password' })
  }
})

module.exports = loginRouter