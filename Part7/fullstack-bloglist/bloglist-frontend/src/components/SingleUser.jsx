import { Link } from "react-router-dom"

const SingleUser = ({ singleUser }) => {
  if (!singleUser) {
    return null
  }
  return (
    <div>
      <h2>{singleUser.name}</h2>
      <strong>Added Blogs</strong>
      <ul>
        {singleUser.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser
