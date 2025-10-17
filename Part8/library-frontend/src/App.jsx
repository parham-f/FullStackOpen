import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import AuthorsView from "./components/AuthorsView"
import BooksView from "./components/BooksView"
import BookForm from "./components/BookForm"
import Login from "./components/Login"
import { useState, useEffect } from "react"

const App = () => {
  const [token, setToken] = useState(null)

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
        <Route path="/books" element={<BooksView />} />
        <Route path="/new-book" element={<BookForm />} />
        {!token && (
          <Route path="/login" element={<Login setToken={setToken} />} />
        )}
      </Routes>
    </div>
  )
}

export default App
