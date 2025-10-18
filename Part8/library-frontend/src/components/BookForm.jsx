import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_BOOK } from "../queries"
import { gql } from "@apollo/client"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genres, setGenres] = useState([])
  const [singleGenre, setSingleGenre] = useState("")

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

  const [createBook] = useMutation(CREATE_BOOK, {
    update(cache, { data }) {
      const book = data?.addBook // or whatever your field is called
      if (!book) return

      cache.modify({
        id: cache.identify({ __typename: "Query" }),
        fields: {
          // Works for all active allBooks caches, including genre-filtered ones
          allBooks(existingRefs = [], { readField, toReference, args }) {
            // If you use keyArgs: ['genre'], only insert when this list's genre matches
            if (args?.genre && !book.genres?.includes(args.genre))
              return existingRefs

            const id = book.id
            if (existingRefs.some((ref) => readField("id", ref) === id))
              return existingRefs

            const newRef =
              toReference({ __typename: "Book", id }) ||
              cache.writeFragment({ fragment: NEW_BOOK_FRAGMENT, data: book })

            return [...existingRefs, newRef]
          },
        },
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
