const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'superUser', passwordHash })
  await user.save()

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
        const loginRes = await api.post('/api/login').send({ username: 'root', password: 'sekret'})
        const token = loginRes._body.token
        
        const newBlog = {
            title: "New Blog",
            author: "New Blog Writer",
            url: "https://newblog.com/",
            likes: 77
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',  `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const {id, user, ...savedBlogWithoutID} = blogsAtEnd[helper.initialBlogs.length]
        assert.deepStrictEqual(savedBlogWithoutID, newBlog)
    })
})

describe('Validating parameters', () => {
    test('blog with no like -> likes=0', async () => {
        const loginRes = await api.post('/api/login').send({ username: 'root', password: 'sekret'})
        const token = loginRes._body.token

        const newBlog = {
            title: "No Likes",
            author: "No Likes Writer",
            url: "https://nolikes.com/"
        }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization',  `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[helper.initialBlogs.length].likes, 0)
    })

    test('blog with no title/url gets 400', async () => {
        const loginRes = await api.post('/api/login').send({ username: 'root', password: 'sekret'})
        const token = loginRes._body.token

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
            .set('Authorization',  `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/blogs')
            .send(noURLBlog)
            .set('Authorization',  `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const loginRes = await api.post('/api/login').send({ username: 'root', password: 'sekret'})
      const token = loginRes._body.token

      const newBlog = {
            title: "New Blog",
            author: "New Blog Writer",
            url: "https://newblog.com/",
            likes: 77
        }

       await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',  `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[2]

      await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization',  `Bearer ${token}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map((blog) => blog.url)
      assert(!contents.includes(blogToDelete.url))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('Updating a blog', () => {
    test('succeeds with status code 200', async () => {
        const loginRes = await api.post('/api/login').send({ username: 'root', password: 'sekret'})
        const token = loginRes._body.token

        const newBlog = {
                title: "New Blog",
                author: "New Blog Writer",
                url: "https://newblog.com/",
                likes: 77
            }

       await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',  `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedBlog = {
            title: "Updated React patterns",
            author: "Updated Michael Chan",
            url: "https://newblog.com/",
            likes: 777
        }

        const blogsAtStart = await helper.blogsInDb()
        const selectedBlog = blogsAtStart.filter(blog => blog.url === updatedBlog.url)

        await api
            .put(`/api/blogs/${selectedBlog[0].id}`)
            .send(updatedBlog)
            .set('Authorization',  `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

after(async () => {
  await mongoose.connection.close()
})