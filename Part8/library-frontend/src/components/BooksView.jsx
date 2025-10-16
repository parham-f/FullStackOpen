import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"

const BooksView = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

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
          {result.data.allBooks.map((b) => (
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
