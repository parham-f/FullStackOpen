import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material"

const SingleBlog = ({ blog, setBlogs }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState("")

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

  const handleInputChange = (event) => {
    setComment(event.target.value)
  }

  const handleAddComment = async () => {
    const updated = await blogService.addComment(comment, blog.id)
    setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
    setComment("")
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
      <br></br>
      {loggedin && (
        <>
          Likes: {blog.likes}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleLike}
          >
            Like
          </Button>
          <br></br>
          <br></br>
        </>
      )}
      {!loggedin && (
        <>
          Likes: {blog.likes}
          <br></br>
          <br></br>
        </>
      )}
      Added by {blog.user.name}
      <br></br>
      <br></br>
      {sameUsername && (
        <Button
          variant="contained"
          color="error"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <strong>Comments</strong>
      <div>
        <TextField
          type="text"
          label="username"
          value={comment}
          onChange={handleInputChange}
          color="primary"
          variant="filled"
        />
        <Button
          style={{ marginTop: "10px", marginLeft: "5px" }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </div>
      {blog.comments.length === 0 && <p>No Comments</p>}
      {blog.comments.length !== 0 && (
        <List
          sx={{
            listStyleType: "disc",
            pl: 2,
            "& .MuiListItem-root": { display: "list-item" },
          }}
        >
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default SingleBlog
