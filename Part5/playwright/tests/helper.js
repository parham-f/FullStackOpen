const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', {name: 'Login'}).click()
}

const resetDB = async (request) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', {
    data: {
        name: 'root user',
        username: 'root',
        password: 'sekret'
        }
    })
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'Create new blog'}).click()
  await page.locator('id=titleInput').fill(title)
  await page.locator('id=authorInput').fill(author)
  await page.locator('id=urlInput').fill(url)
  await page.getByRole('button', {name: 'Create'}).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}
export {loginWith, resetDB, createBlog}