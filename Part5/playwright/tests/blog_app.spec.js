const {test, describe, expect, beforeEach} = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({page}) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    const loginButton = page.getByRole('button', { name: 'Login' })

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
})