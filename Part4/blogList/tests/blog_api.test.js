const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
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

describe('Getting blogs', () => {
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
})

describe('Creating a blog', () => {
    test('a valid blog can be added', async () => {
    const newBlog = {
        title: "New Blog",
        author: "New Blog Writer",
        url: "https://newblog.com/",
        likes: 77
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const {id, ...savedBlogWithoutID} = blogsAtEnd[helper.initialBlogs.length]
    assert.deepStrictEqual(savedBlogWithoutID, newBlog)
    })
})

describe('Validating parameters', () => {
    test('blog with no like -> likes=0', async () => {
        const newBlog = {
        title: "No Likes",
        author: "No Likes Writer",
        url: "https://nolikes.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[helper.initialBlogs.length].likes, 0)
    })

    test('blog with no title/url gets 400', async () => {
        const noTitleBlog = {
        author: "No Likes Writer",
        url: "https://nolikes.com/",
        likes: 33
    }
    const noURLBlog = {
        title: "No Likes",
        author: "No Likes Writer",
        likes: 33
    }

    await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send(noURLBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map((blog) => blog.url)
      assert(!contents.includes(blogToDelete.url))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})

after(async () => {
  await mongoose.connection.close()
})