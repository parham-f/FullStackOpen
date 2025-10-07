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
export {loginWith, resetDB}