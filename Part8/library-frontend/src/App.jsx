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
import { gql } from "@apollo/client"

const App = () => {
  const [token, setToken] = useState(null)
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  const seen = useRef(new Set())

  useEffect(() => {
    const t = window.localStorage.getItem("library-user-token")
    if (t) setToken(t)
  }, [])

  useEffect(() => {
    if (token) client.resetStore().catch(() => {})
  }, [token, client])

  const NEW_BOOK_FRAGMENT = gql`
    fragment NewBook on Book {
      id
      title
      published
      genres
      author {
        id
        name
      }
    }
  `

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("📡 BOOK_ADDED payload:", data)
      const book = data?.data?.bookAdded
      if (!book) return

      const id = book.id
      if (seen.current.has(id)) return
      seen.current.add(id)

      window.alert(`${book.title} by ${book.author?.name} Added.`)

      client.cache.modify({
        id: client.cache.identify({ __typename: "Query" }),
        fields: {
          allBooks(existingRefs = [], { readField, toReference, args }) {
            if (args?.genre && !book.genres?.includes(args.genre))
              return existingRefs
            if (existingRefs.some((ref) => readField("id", ref) === id))
              return existingRefs

            const newRef =
              toReference({ __typename: "Book", id }) ||
              client.cache.writeFragment({
                fragment: NEW_BOOK_FRAGMENT,
                data: book,
              })

            return [...existingRefs, newRef]
          },
        },
      })
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
