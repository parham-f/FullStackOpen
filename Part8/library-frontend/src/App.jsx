import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import AuthorsView from "./components/AuthorsView"
import BooksView from "./components/BooksView"
import BookForm from "./components/BookForm"
import Login from "./components/Login"
import Recommended from "./components/Recommended"
import { useState, useEffect, useRef } from "react"
import { useSubscription, useApolloClient } from "@apollo/client/react"
import { BOOK_ADDED } from "./queries"

const App = () => {
  const [token, setToken] = useState(null)
  const [genres, setGenres] = useState([])

  const seenIds = useRef(new Set())

  const client = useApolloClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("library-user-token")
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data?.data?.bookAdded
      if (!book) return

      if (seenIds.current.has(book.id)) return
      seenIds.current.add(book.id)

      window.alert(`${book.title} by ${book.author?.name} Added.`)
    },
  })

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
