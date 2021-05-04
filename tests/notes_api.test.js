const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Note = require('../models/note')

describe('Before we load any notes in the database', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
  })

  test('there are no notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(0)
  })
})

describe('Now let us test the notes logic', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Note.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user_admin = new User({ ...helper.users[0], passwordHash }) // admin
    await user_admin.save()
    const user_client = new User({ ...helper.users[3], passwordHash }) // client
    await user_client.save()
  })

  test('Test that only admin can make notes', async () => {
    const allNotesBefore = await helper.notesInDB()
    const user = await User.findOne({ username: 'rocky' })
    // console.log('FOUND USER: ', user._id)

    const loggedUser = await api.post('/api/login').send({ username: 'wick', password: 'secret' })
    // console.log('LOGGED USER: ', loggedUser.body.userType)

    const data = {
      clientId: user._id,
      note: {
        ...helper.notes[0]
      },
      loggedUserType: loggedUser.body.userType
    }
    // console.log('data: ', data)
    const response = await api.post('/api/notes').send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // console.log('RESPONSE AFTER SAVING NOTE: ', response.body)
    expect(response.body.title).toContain(helper.notes[0].title)
    const allNotesAfter = await helper.notesInDB()
    expect(allNotesAfter).toHaveLength(allNotesBefore.length + 1)
  })

  test('Test the client cannot make a note', async () => {
    const allNotesBefore = await helper.notesInDB()
    const loggedUser = await api.post('/api/login').send({ username: 'rocky', password: 'secret' })
    console.log('LOGGED USER: ', loggedUser.body.userType)

    const data = {
      clientId: loggedUser.body.id,
      note: {
        ...helper.notes[0]
      },
      loggedUserType: loggedUser.body.userType
    }
    const response = await api.post('/api/notes').send(data)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    console.log('RESPONSE AFTER SAVING NOTE: ', response.body.error)
    expect(response.body.error).toContain('Only admins can write a note')
    const allNotesAfter = await helper.notesInDB()
    expect(allNotesAfter).toHaveLength(allNotesBefore.length)
  })
})

afterAll(() => { mongoose.connection.close() })