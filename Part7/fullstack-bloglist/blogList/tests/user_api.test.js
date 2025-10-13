const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'superUser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with duplicate username', async () => {
    const newUser = {
      username: 'root',
      name: 'superUser',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const bodyString = JSON.stringify(res.body)
      assert.ok(bodyString.includes('expected `username` to be unique'))
  })

  test('creation fails without username', async () => {
    const newUser = {
      name: 'superUser',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const bodyString = JSON.stringify(res.body)
      assert.ok(bodyString.includes('`username` is required.'))
  })

  test('creation fails without password', async () => {
    const newUser = {
      username: 'newUser',
      name: 'New User',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const bodyString = JSON.stringify(res.body)
      assert.ok(bodyString.includes('password is require'))
  })

  test('creation fails with password < 3', async () => {
    const newUser = {
      username: 'newUser',
      name: 'New User',
      password: 'sa',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const bodyString = JSON.stringify(res.body)
      assert.ok(bodyString.includes('expected `password` to be at least 3 characters'))
  })
})

after(async () => {
  await mongoose.connection.close()
})