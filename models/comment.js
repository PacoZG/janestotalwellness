const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
    },
    replies: [
      {
        author: String,
        content: String,
        createdAt: String,
      },
    ],
    userId: String,
    author: String,
    content: String,
    likes: Number,
    dislikes: Number,
  },
  { timestamps: true }
)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
