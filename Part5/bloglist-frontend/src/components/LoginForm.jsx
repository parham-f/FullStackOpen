import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({notifyWith, setUser}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notifyWith('Successful Login')
      setUsername('')
      setPassword('')
    } catch {
      notifyWith('Wrong Username or Password', true)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm