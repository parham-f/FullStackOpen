import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { initUser, login, logout } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const initBlogs = useSelector((state) => state.blogs)

  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    setBlogs(initBlogs)
  }, [initBlogs])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])

  useEffect(() => {
    dispatch(initUser()) // rehydrate user & set token
    dispatch(initializeBlogs()) // fetch blogs
  }, [dispatch])

  const handleLogin = async (username, password) => {
    // if you need the error, you can unwrap: await dispatch(login({ username, password })).unwrap()
    dispatch(login({ username, password }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const noBlog = blogs.length === 0 ? true : false

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {!user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <div>
          <p>
            {user.name} logged in
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

export default App
