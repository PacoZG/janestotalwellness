const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    content: String,
    author: String,
    likes: Number,
    dislikes: Number,
    image: String,
    comments: [
      {
        content: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
