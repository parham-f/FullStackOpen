import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = (event) => {
    setDetailed(!detailed)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService.updateBlog(updatedBlog, blog.id, blogs, setBlogs)
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
      <button onClick={toggleDetail}>Hide</button><br></br>
      {blog.url}<br></br>
      Likes: {blog.likes}
      <button onClick={handleLike}>Like</button><br></br>
      {blog.user.name}
    </div>
    )}
  </div>  
  )
}

export default Blog