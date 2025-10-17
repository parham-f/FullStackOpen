import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genres, setGenres] = useState([])
  const [singleGenre, setSingleGenre] = useState("")

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  })

  const submit = (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: Number(published), genres },
    })

    setTitle("")
    setAuthor("")
    setPublished("")
    setGenres([])
    setSingleGenre("")
  }

  const handleGenreButton = () => {
    setGenres((prev) => [...prev, singleGenre])
    setSingleGenre("")
  }

  return (
    <div>
      <h1>New Book</h1>
      <form onSubmit={submit}>
        <div>
          Title:{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published:{" "}
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          Genres:{" "}
          <input
            value={singleGenre}
            onChange={({ target }) => setSingleGenre(target.value)}
          />
          <button type="button" onClick={handleGenreButton}>
            Add Genre
          </button>
          <br></br>
          Added genres: {[...genres].join(", ")}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BookForm
