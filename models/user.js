const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  createdAt: Date,
  userType: String,
  username: {
    type: String,
    unique: true,
    minlength: [3, 'User has to be at least 4 characters long']
  },
  name: {
    type: String,
    minlength: [3, 'Name has to be at least 5 characters long']
  },
  email: {
    type: String,
    unique: [true, 'email is already register in the data base']
  },
  passwordHash: String,
  age: Number,
  height: {
    type: Number,
    required: [true, 'Please enter your height in cm']
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight in kg']
  },
  hobbies: [
    {
      type: String,
    }
  ],
  motivation: {
    type: String,
    required: [true, 'Please write your hobbies to know you better']
  }
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