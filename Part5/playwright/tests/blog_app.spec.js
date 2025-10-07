const {test, describe, expect, beforeEach} = require('@playwright/test')
const {loginWith, resetDB} = require('./helper')

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
})