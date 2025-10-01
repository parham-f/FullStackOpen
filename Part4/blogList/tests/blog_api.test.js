const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned with same amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are returned with id field (not _id)', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = result.body

  blogs.forEach(blog => {
    assert.ok(Object.hasOwn(blog, 'id'))
    assert.equal(blog._id, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})