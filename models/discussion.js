const mongoose = require('mongoose')

const discussionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    topic: String,
    author: String,
    title: String,
    content: String,
    likes: Number,
    dislikes: Number,
  },
  { timestamps: true }
)

discussionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Discussion', discussionSchema)
