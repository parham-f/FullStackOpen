import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    const fetchingBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      setBlogs(fetchedBlogs)
    }
    fetchingBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notifyWith(`Wrong Username or Password`, true)
      setUsername('')
      setPassword('')
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    blogService.newBlog({
      title: title,
      author: author,
      url: url
    }, setBlogs, blogs, notifyWith)

    setTitle('')
    setAuthor('')
    setURL('')
  }

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleURLChange = (event) => setURL(event.target.value)

  if (user === null) {
    return (
      <div>
      <h2>Login to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
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

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogAppUser')
          window.location.reload()
        }}>Logout</button>
      </p>
      <h2>Create New Blog</h2>  
      <form onSubmit={addBlog}>
        <div>Title: <input value={title} onChange={handleTitleChange}/></div>
        <div>Author: <input value={author} onChange={handleAuthorChange}/></div>
        <div>URL: <input value={url} onChange={handleURLChange}/></div>
        <div><button type="submit">Create</button></div>
      </form>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App