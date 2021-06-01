const User = require('../models/user')
const Note = require('../models/note')
const Discussion = require('../models/discussion')
const Comment = require('../models/comment')

const date = new Date()

const users = [
  {
    createdAt: date,
    userType: 'admin',
    username: 'wick',
    firstName: 'John',
    lastName: 'Wick',
    email: 'john.wick@example.com',
    dateOfBirth: '1976-10-17T00:00:00.000+00:00',
    height: 180,
    weight: 85,
    gender: 'male',
    country: 'United States',
    background: 'cooking, movies, wine',
    goals: 'Wanna feel stronger',
  },
  {
    // user with same username and email
    username: 'wick',
    firstName: 'John',
    lastName: 'Wick',
    email: 'john.wick@example.com',
    dateOfBirth: '1976-10-17T00:00:00.000+00:00',
    height: 180,
    weight: 85,
    gender: 'male',
    country: 'United States',
    background: 'cooking, movies, wine',
    goals: 'Wanna feel stronger',
    password: 'secret',
  },
  {
    // user with the same email
    username: 'bruce',
    firstName: 'Bruce',
    lastName: 'Willis',
    email: 'john.wick@example.com',
    dateOfBirth: '1976-10-17T00:00:00.000+00:00',
    height: 180,
    weight: 85,
    gender: 'male',
    country: 'United States',
    background: 'cooking, movies, wine',
    goals: 'Wanna feel stronger',
    password: 'secret',
  },
  {
    createdAt: date,
    userType: 'client',
    username: 'rocky',
    firstName: 'Silvester',
    lastName: 'Stalone',
    email: 'silvester@example.com',
    dateOfBirth: '1965-11-05T00:00:00.000+00:00',
    height: 180,
    weight: 85,
    gender: 'male',
    country: 'United States',
    background: 'cooking, movies, wine',
    goals: 'Wanna be rich like a bitch',
    password: 'secret',
  },
]

const notes = [
  {
    content: 'When I was a child the walls were filled with bees. Burr and sugar.',
  },
  {
    content: 'First, study lungs. See lungs in trees, bronchial the limbs, packed',
  },
]

const discussions = [
  {
    userId: '609507e4e56b7b19b0c8f21d',
    topic: 'Exercise',
    author: 'Paco',
    title: 'I want to know more about Lorem',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting indus...',
    likes: 3,
    dislikes: 2,
  },
]

const newDiscussion = {
  userId: '609507e4e56b7b19b0c8f21d',
  topic: 'Exercise',
  author: 'Paco',
  title: 'I want to know more about Lorem',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting indus...',
}

const comment = {
  userId: '609507e4e56b7b19b0c8f21d',
  author: 'pacozg',
  content: 'comment 1',
}

const reply = {
  author: 'Samu',
  content: 'reply 1',
  createdAt: new Date(),
}

const usersInDB = async () => {
  const users = await User.find({})
  return users
}

const notesInDB = async () => {
  const notes = await Note.find({})
  return notes
}

const discussionsInDB = async () => {
  const discussions = await Discussion.find({})
  return discussions
}

const commentsInDB = async () => {
  const comments = await Comment.find({})
  return comments
}

module.exports = {
  users,
  notes,
  discussions,
  newDiscussion,
  comment,
  reply,
  usersInDB,
  notesInDB,
  discussionsInDB,
  commentsInDB,
}
