const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(201).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    dislikes: body.dislikes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  response.json(blog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    content: body.content,
    author: body.author,
    likes: body.likes,
    dislikes: body.dislikes,
    comments: body.comments,
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => updatedBlog.toJSON())
    .then(savedAndUpdatedBlog => {
      response.status(201).json(savedAndUpdatedBlog)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json().end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    content: body.content,
    author: body.author,
    likes: body.likes,
    comments: body.comments,
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => updatedBlog.toJSON())
    .then(savedAndUpdatedBlog => {
      response.status(201).json(savedAndUpdatedBlog)
    })
})

module.exports = blogsRouter
