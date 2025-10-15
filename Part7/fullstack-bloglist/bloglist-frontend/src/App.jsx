import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import UserList from "./components/userList"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { initUser, login, logout } from "./reducers/userReducer"
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const initBlogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    setBlogs(initBlogs)
  }, [initBlogs])

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    dispatch(login({ username, password }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const noBlog = blogs.length === 0 ? true : false

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    }
    return (
      <div>
        <Link to="/" style={padding}>
          Home
        </Link>
        <Link to="/users" style={padding}>
          Users
        </Link>
      </div>
    )
  }

  const defaultView = (user) => {
    return (
      <div>
        {!user && <LoginForm onLogin={handleLogin} />}
        {user && (
          <div>
            <p>{user.name} logged in</p>
            <p>
              <button onClick={handleLogout}>Logout</button>
            </p>
            <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
              <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                blogFormRef={blogFormRef}
                user={user}
              />
            </Togglable>
          </div>
        )}
        <br></br>
        {noBlog && <div>No Blog</div>}
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <Menu />
      <h2>Blogs</h2>
      <Notification />
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={defaultView(user)} />
      </Routes>
    </div>
  )
}

export default App
