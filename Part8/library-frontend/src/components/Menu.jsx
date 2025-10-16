import { Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        Authors
      </Link>
      <Link to="/books" style={padding}>
        Books
      </Link>
      <Link to="/new-book" style={padding}>
        New Book
      </Link>
    </div>
  )
}

export default Menu
