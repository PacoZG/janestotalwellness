const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    likes: Number,
    imageURL: String,
    imageID: String,
    dislikes: Number,
    comments: [
      {
        author: {
          type: String,
          required: true,
        },
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
