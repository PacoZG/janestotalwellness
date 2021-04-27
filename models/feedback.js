const mongoose = require('mongoose')

let feedbackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'Title need at least 5 characters']
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: String,
    }
  ],
  date: Date,
})

feedbackSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Feedback', feedbackSchema)