import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import UserList from "./components/userList"
import SingleUser from "./components/SingleUser"
import SingleBlog from "./components/SingleBlog"
import usersServices from "./services/users"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { initUser, login, logout } from "./reducers/userReducer"
import { Routes, Route, Link, useMatch } from "react-router-dom"
import { Container, AppBar, Toolbar, Button, Box } from "@mui/material"

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const initBlogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const load = async () => {
      setUsers(await usersServices.getAll())
    }
    load()
  }, [])

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

  const userMatch = useMatch("/users/:id")
  const singleUser = userMatch
    ? users.find((u) => String(u.id) === userMatch.params.id)
    : null

  const blogMatch = useMatch("/blogs/:id")
  const singleBlog = blogMatch
    ? blogs.find((b) => String(b.id) === blogMatch.params.id)
    : null

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
            {!user && (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Togglable buttonLabel="Login" ref={blogFormRef}>
                  <LoginForm onLogin={handleLogin} />
                </Togglable>
              </>
            )}
            {user && (
              <>
                <Box sx={{ flexGrow: 1 }} />
                {user.name} logged in &nbsp;
                <Button
                  style={{ border: "2px solid", fontSize: "15px" }}
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  const defaultView = (user) => {
    return (
      <div>
        <h2>Blogs</h2>
        {user && (
          <div>
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
        {noBlog && <div>No Blog</div>}
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/users" element={<UserList users={users} />} />
          <Route
            path="/users/:id"
            element={<SingleUser singleUser={singleUser} />}
          />
          <Route
            path="/blogs/:id"
            element={<SingleBlog blog={singleBlog} setBlogs={setBlogs} />}
          />
          <Route path="/" element={defaultView(user)} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
