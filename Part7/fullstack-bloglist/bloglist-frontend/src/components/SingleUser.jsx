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
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser
