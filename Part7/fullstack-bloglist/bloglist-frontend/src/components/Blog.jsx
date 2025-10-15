import { Link } from "react-router-dom"
import { List, ListItem, ListItemText } from "@mui/material"

const Blog = ({ blog }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    borderRadius: "5px",
    marginTop: 5,
  }

  return (
    <div style={blogStyle}>
      <ListItem>
        <ListItemText>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </ListItemText>
      </ListItem>
    </div>
  )
}

export default Blog
