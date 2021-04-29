const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const imageRouter = require('./controllers/images')
const notesRouter = require('./controllers/notes')

const url = config.MONGODB_URI
console.log('Connected to MongoDB')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json({ limit: '50mb' }))
app.use(express.static('build'))

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/images', imageRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)

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