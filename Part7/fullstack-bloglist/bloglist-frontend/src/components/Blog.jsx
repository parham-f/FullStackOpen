import { useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [detailed, setDetailed] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetail = () => {
    setDetailed(!detailed)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    blogService.updateBlog(updatedBlog, blog.id, blogs, setBlogs)
    dispatch(
      showNotification(
        `'${blog.title} - ${blog.author}' blog updated.`,
        5,
        false
      )
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog '${blog.title} - ${blog.author}' ?`)) {
      blogService.deleteBlog(blog, blog.id, blogs, setBlogs)
      dispatch(
        showNotification(
          `'${blog.title} - ${blog.author}' blog deleted.`,
          5,
          false
        )
      )
    }
  }

  let sameUsername = false
  let loggedin = false
  if (user) {
    sameUsername = user.username === blog.user.username ? true : false
    loggedin = true
  }

  return (
    <div style={blogStyle}>
      {!detailed && (
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleDetail}>View</button>
        </div>
      )}
      {detailed && (
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleDetail}>Hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {loggedin && (
            <>
              Likes: {blog.likes}
              <button onClick={handleLike}>Like</button>
              <br></br>
            </>
          )}
          {!loggedin && (
            <>
              Likes: {blog.likes}
              <br></br>{" "}
            </>
          )}
          {blog.user.name}
          <br></br>
          {sameUsername && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
