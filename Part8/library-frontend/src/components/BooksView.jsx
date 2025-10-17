import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ALL_BOOK_GENRE } from "../queries"
import { useState, useRef, useEffect } from "react"

const BooksView = () => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const genresSetRef = useRef(false)

  const allBooksQ = useQuery(ALL_BOOKS, {
    skip: !!genre,
  })

  const byGenreQ = useQuery(ALL_BOOK_GENRE, {
    variables: { genre },
    skip: !genre,
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
      <button onClick={() => setGenre(null)}>All Genres</button>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default BooksView
