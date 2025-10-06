import {useState} from 'react'

const Blog = ({blog}) => {
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog)

  const toggleDetail = (event) => {
    setDetailed(!detailed)
  }

  const handleLike = () => {

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