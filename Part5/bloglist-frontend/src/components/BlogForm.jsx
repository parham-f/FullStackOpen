import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, blogs, notifyWith, blogFormRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleURLChange = (event) => setURL(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    blogService.newBlog({
      title: title,
      author: author,
      url: url
    }, setBlogs, blogs, notifyWith, user)

    setTitle('')
    setAuthor('')
    setURL('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input value={title} onChange={handleTitleChange} /></div>
        <div>Author: <input value={author} onChange={handleAuthorChange} /></div>
        <div>URL: <input value={url} onChange={handleURLChange} /></div>
        <div><button type="submit">Create</button></div>
      </form>
    </div>
  )
}

export default BlogForm