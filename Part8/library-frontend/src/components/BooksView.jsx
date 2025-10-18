import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ALL_BOOK_GENRE } from "../queries"
import { useState, useRef, useEffect } from "react"

const BooksView = ({ genres, setGenres }) => {
  const [genre, setGenre] = useState(null)
  const genresSetRef = useRef(false)

  const allBooksQ = useQuery(ALL_BOOKS, {
    skip: !!genre,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  })

  const byGenreQ = useQuery(ALL_BOOK_GENRE, {
    variables: { genre },
    skip: !genre,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  })

  useEffect(() => {
    if (!genresSetRef.current && allBooksQ.data?.allBooks) {
      const once = [
        ...new Set(allBooksQ.data.allBooks.flatMap((b) => b.genres)),
      ]
      setGenres(once)
      genresSetRef.current = true
    }
  }, [allBooksQ.data])

  const activeQ = genre ? byGenreQ : allBooksQ
  if (activeQ.loading) return <div>loading...</div>
  if (activeQ.error) return <div>Error: {activeQ.error.message}</div>

  const books = activeQ.data?.allBooks ?? []

  return (
    <div>
      <h1>Books</h1>
      <button onClick={() => setGenre(null)}>All Genres</button>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksView
