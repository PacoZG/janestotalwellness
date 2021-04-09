const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  createdAt: Date,
  userType: String,
  username: {
    type: String,
    unique: [true, 'Username has been already used'],
    minlength: [3, 'User has to be at least 4 characters long']
  },
  firstName: {
    type: String,
    required: [true, 'First name is missing']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is missing']
  },
  email: {
    type: String,
    unique: [true, 'email is already register in the data base'],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide your date of birth']
  },
  height: {
    type: Number,
    required: [true, 'Please enter your height in cm']
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight in kg']
  },
  background: String,
  motivation: {
    type: String,
    required: [true, 'Please write your hobbies to know you better']
  },
  img: {
    data: Buffer, contentType: String
  },
  passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User