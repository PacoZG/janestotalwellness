const User = require('../models/user')
const Note = require('../models/note')

const date = new Date()

const users = [
  {
    createdAt: date,
    userType: "admin",
    username: "wick",
    firstName: "John",
    lastName: "Wick",
    email: "john.wick@example.com",
    dateOfBirth: "1976-10-17T00:00:00.000+00:00",
    height: 180,
    weight: 85,
    gender: "male",
    country: "United States",
    background: "cooking, movies, wine",
    goals: "Wanna feel stronger",
  },
  { // user with same username and email
    username: "wick",
    firstName: "John",
    lastName: "Wick",
    email: "john.wick@example.com",
    dateOfBirth: "1976-10-17T00:00:00.000+00:00",
    height: 180,
    weight: 85,
    gender: "male",
    country: "United States",
    background: "cooking, movies, wine",
    goals: "Wanna feel stronger",
    password: 'secret'
  },
  { // user with the same email
    username: "bruce",
    firstName: "Bruce",
    lastName: "Willis",
    email: "john.wick@example.com",
    dateOfBirth: "1976-10-17T00:00:00.000+00:00",
    height: 180,
    weight: 85,
    gender: "male",
    country: "United States",
    background: "cooking, movies, wine",
    goals: "Wanna feel stronger",
    password: 'secret'
  },
  { 
    createdAt: date,
    userType: "client",
    username: "rocky",
    firstName: "Silvester",
    lastName: "Stalone",
    email: "silvester@example.com",
    dateOfBirth: "1965-11-05T00:00:00.000+00:00",
    height: 180,
    weight: 85,
    gender: "male",
    country: "United States",
    background: "cooking, movies, wine",
    goals: "Wanna be rich like a bitch",
    password: 'secret'
  },
]

const notes = [
  { 
    title: "It was exciting",
    content: "When I was a child the walls were filled with bees. Burr and sugar.",
  },
  {
    title: "The client didn't want to move his ass",
    content: "First, study lungs. See lungs in trees, bronchial the limbs, packed",
  }
]

const usersInDB = async () => {
  const users = await User.find({})
  return users
}

const notesInDB = async () => {
  const notes = await Note.find({})
  return notes
}

module.exports = { users, notes, usersInDB, notesInDB }