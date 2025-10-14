import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"

const SingleBlog = ({ blog, setBlogs }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [comments, setComments] = useState([])

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
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <br></br>
      <a href={blog.url}>{blog.url}</a>
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
          <br></br>
        </>
      )}
      Added by {blog.user.name}
      <br></br>
      {sameUsername && <button onClick={handleDelete}>Delete</button>}
      <br></br>
      <strong>Comments</strong>
      {blog.comments.length === 0 && <p>No Comments</p>}
      {blog.comments.length !== 0 && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SingleBlog
