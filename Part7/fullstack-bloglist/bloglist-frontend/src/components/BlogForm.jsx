import { useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"
import { TextField, Button } from "@mui/material"

const BlogForm = ({ setBlogs, blogs, blogFormRef, user }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")

  const dispatch = useDispatch()

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleURLChange = (event) => setURL(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    blogService.newBlog(
      {
        title: title,
        author: author,
        url: url,
      },
      setBlogs,
      blogs,
      user
    )
    dispatch(
      showNotification(`A new blog '${title}' by '${author}' added.`, 5, false)
    )

    setTitle("")
    setAuthor("")
    setURL("")
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"
            value={title}
            id="titleInput"
            onChange={handleTitleChange}
            color="inherit"
          />
        </div>
        <div>
          <TextField
            label="Author"
            value={author}
            id="authorInput"
            onChange={handleAuthorChange}
            color="inherit"
            style={{ marginTop: "5px" }}
          />
        </div>
        <div>
          <TextField
            label="URL"
            value={url}
            id="urlInput"
            onChange={handleURLChange}
            style={{ marginTop: "5px" }}
          />
        </div>
        <div>
          <Button
            style={{ marginTop: 5, border: "2px solid", fontSize: "15px" }}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
