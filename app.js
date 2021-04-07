const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require ('./utils/middleware')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const url = config.MONGODB_URI
console.log('Connected to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
  logger.info('Connected to MongoDB')
})
.catch(error => {
  logger.error('error connecting to MongoDB: ', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

//app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/helloworld', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app