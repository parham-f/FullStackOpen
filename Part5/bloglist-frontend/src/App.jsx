import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null })
  const [user, setUser] = useState(null)

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
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />

      {!user && (<LoginForm notifyWith={notifyWith} setUser={setUser}/>)}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogAppUser')
              window.location.reload()
            }}>Logout</button>
          </p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} blogFormRef={blogFormRef} user={user}/>
          </Togglable>
        </div>
      )}
      <br></br>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} user={user}/>)
      }
    </div>
  )
}

export default App