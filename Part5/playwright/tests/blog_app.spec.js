const {test, describe, expect, beforeEach} = require('@playwright/test')
const {loginWith, resetDB, createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({page}) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    const loginButton = page.getByRole('button', {name: 'Login'})

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({request}) => {
      await resetDB(request)
    })

    test('succeeds with correct credentials', async ({page}) => {
      await loginWith(page, 'root', 'sekret')
      await expect(page.getByText('root user logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await loginWith(page, 'root', 'wrong')
      await expect(page.getByText('root user logged in')).not.toBeVisible()
      await expect(page.getByText('Wrong Username or Password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page, request}) => {
      await resetDB(request)
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'test title', 'test author', 'https://testurl.com')
      await expect(page.getByText('test title - test author')).toBeVisible()
    })

    test('a new blog can be liked', async ({page}) => {
      await createBlog(page, 'test title', 'test author', 'https://testurl.com')
      await page.getByRole('button', {name: 'View'}).click()
      await page.getByRole('button', {name: 'Like'}).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })
  })
})