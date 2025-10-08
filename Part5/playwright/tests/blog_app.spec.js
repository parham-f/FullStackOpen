const {test, describe, expect, beforeEach} = require('@playwright/test')
const {loginWith, resetDB, createBlog} = require('./helper')
const { log } = require('console')

describe('Blog app', () => {
  beforeEach(async ({page, request}) => {
    await resetDB(request)
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
    beforeEach(async ({page}) => {
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
      await page.getByText('Likes: 0').waitFor()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('a new blog can be deleted', async ({page}) => {
      await createBlog(page, 'test title', 'test author', 'https://testurl.com')
      await page.getByRole('button', {name: 'View'}).click()
      

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: 'Delete'}).click()

      await expect(page.getByText('No Blog')).toBeVisible()
    })

    test('a blog can not delete with another user', async ({request, page}) => {
      await createBlog(page, 'test title', 'test author', 'https://testurl.com')
      await request.post('/api/users', {
        data: {
            name: 'new user',
            username: 'newUser',
            password: 'password'
            }
      })
      await page.getByRole('button', {name: 'Logout'}).click()
      await loginWith(page, 'newUser', 'password')
      await page.getByRole('button', {name: 'View'}).click()
      await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible()
    })

    test('blogs are sorted based on likes', async ({page}) => {
      const clickLike = async (ln) => {
        await Promise.all([
        page.waitForResponse(
          (r) => r.url().includes('/api/blogs') && r.request().method() === 'PUT' && r.status() === 200
        ),
        await page.getByRole('button', {name: 'Like'}).click(),
        {if(ln) {page.getByText(`Likes: ${ln}`).waitFor()}}
        ])
      }

      await createBlog(page, 'test1 title', 'test1 author', 'https://testurl1.com')
      await createBlog(page, 'test2 title', 'test2 author', 'https://testurl2.com')
      await createBlog(page, 'test3 title', 'test3 author', 'https://testurl3.com')

      const v1 = await page.getByRole('button', {name: 'View'}).all()
      await v1[0].click()
      await clickLike(1)
      const v2 = await page.getByRole('button', {name: 'View'}).all()
      await v2[0].click()
      const h1 = await page.getByRole('button', {name: 'Hide'}).all()
      await h1[0].click()
      await clickLike()
      await clickLike(2)
      const v3 = await page.getByRole('button', {name: 'View'}).all()
      await v3[1].click()
      const h2 = await page.getByRole('button', {name: 'Hide'}).all()
      await h2[0].click()
      await clickLike()
      await clickLike()
      await clickLike(3)
      await page.getByRole('button', {name: 'Hide'}).click()
      
      const divs = page.locator('div[style="padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;"]')
      const expectedOrder = ['test3 title - test3 authorView', 'test2 title - test2 authorView', 'test1 title - test1 authorView']
      await expect(divs).toHaveText(expectedOrder)
    })
  })
})