const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {text: { type: String, required: true}},
  {_id: true}
)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: { type: [commentSchema], default: [] }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    if (Array.isArray(returnedObject.comments)) {
      returnedObject.comments = returnedObject.comments.map(c => ({
        id: c._id?.toString(),
        text: c.text,
        user: c.user,
        createdAt: c.createdAt,
      }))
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)