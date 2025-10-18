import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import AuthorsView from "./components/AuthorsView"
import BooksView from "./components/BooksView"
import BookForm from "./components/BookForm"
import Login from "./components/Login"
import Recommended from "./components/Recommended"
import { useState, useEffect } from "react"

const App = () => {
  const [token, setToken] = useState(null)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("library-user-token")
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  return (
    <div>
      <Menu token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<AuthorsView token={token} />} />
        <Route
          path="/books"
          element={<BooksView genres={genres} setGenres={setGenres} />}
        />
        <Route
          path="/recommended"
          element={<Recommended allGenres={genres} />}
        />
        <Route path="/new-book" element={<BookForm />} />
        {!token && (
          <Route path="/login" element={<Login setToken={setToken} />} />
        )}
      </Routes>
    </div>
  )
}

export default App
