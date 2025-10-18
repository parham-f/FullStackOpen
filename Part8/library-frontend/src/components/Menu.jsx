import { Link } from "react-router-dom"
import { useApolloClient } from "@apollo/client/react"

const Menu = ({ token, setToken }) => {
  const padding = {
    paddingRight: 5,
  }

  const client = useApolloClient()

  return (
    <div>
      <Link to="/" style={padding}>
        Authors
      </Link>
      <Link to="/books" style={padding}>
        Books
      </Link>
      {!token && (
        <Link to="/login" style={padding}>
          Login
        </Link>
      )}
      {token && (
        <>
          <Link to="/new-book" style={padding}>
            New Book
          </Link>
          <Link to="/recommended" style={padding}>
            Recommended
          </Link>
          <button
            onClick={() => {
              window.localStorage.removeItem("library-user-token")
              setToken(null)
              client.resetStore()
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export default Menu
