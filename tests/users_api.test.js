const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Note = require('../models/note')

describe('Before we load anything on the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('there are no users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
  })
})

describe('Now let us save some users and test it', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ ...helper.users[0], passwordHash })
    await user.save()
  })

  test('We can succesfully create another user', async () => {
    const usersBeforeSaving = await helper.usersInDB()
    const newUser = helper.users[3]
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterSaving = await helper.usersInDB()
    expect(usersAfterSaving).toHaveLength(usersBeforeSaving.length + 1)
    expect(response.body.username).toContain(helper.users[3].username)
  })

  test('Username is already in the database', async () => {
    const usersInDBBefore = await helper.usersInDB()
    const newUser = helper.users[1]
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // console.log('ERROR RECEVED IN TEST: ', response.body.message)
    expect(response.body.message).toContain('username: Error')

    const usersInDBAfter = await helper.usersInDB()
    expect(usersInDBAfter).toHaveLength(usersInDBBefore.length)
  })

  test('Email is already in the data base', async () => {
    const usersInDBBefore = await helper.usersInDB()
    const newUser = helper.users[2]
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // console.log('ERROR RECEVED IN TEST: ', response.body.message)
    expect(response.body.message).toContain('email: Error')

    const usersInDBAfter = await helper.usersInDB()
    expect(usersInDBAfter).toHaveLength(usersInDBBefore.length)
  })

  test('User can login', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'wick', password: 'secret' })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // console.log('RESPONSE IN LOGIN: ', response.body)

    expect(response.body.username).toContain('wick')
  })

  test('User fails to login with wrong password or username', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'wick', password: 'wrongPassword' })
      .expect(401)
      .expect('Content-Type', /application\/json/)
    // console.log('RESPONSE ON WRONG PASSWORD: ', response.body.error)

    expect(response.body.error).toContain('Invalid username or password')
  })

  test('User can delete his/her profile', async () => {
    const usersInDB = await helper.usersInDB()
    // console.log('Length 1 ', usersInDB.length)
    const testUser = helper.users[3]
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterSaving = await helper.usersInDB()
    // console.log('Length 2 ', usersAfterSaving.length)
    expect(usersAfterSaving).toHaveLength(usersInDB.length + 1)

    const userToDelete = await User.findOne({ username: testUser.username })
    // console.log('USER TO DELETE: ', userToDelete)

    await api.delete(`/api/users/${userToDelete._id}`)
    const usersAfterDeleting = await helper.usersInDB()

    // console.log('Length 3 ', usersAfterDeleting.length)
    expect(usersAfterDeleting).toHaveLength(usersInDB.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
