const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (user && blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
      return response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({error: "Blog doesn't exist"})
  }

  const user = request.user

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  if (user && blog.user.toString() === user.id.toString()) {
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } else {
      return response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
  const { id } = req.params
  let { comment } = req.body || {}

  const updated = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: { text: comment.trim() } } },
      { new: true, runValidators: true, context: 'query' }
    )

  if (!updated) {
    return res.status(404).json({ error: 'blog not found' })
  }

  return res.status(201).json(updated)
})

module.exports = blogsRouter