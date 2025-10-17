import { useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client/react"
import { useState } from "react"

const AuthorsView = ({ token }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [bornIn, setBornIn] = useState("")

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name: selectedAuthor, setBornTo: Number(bornIn) },
    })
    setSelectedAuthor("")
    setBornIn("")
  }

  return (
    <div>
      <h1>Authors</h1>
      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h2>Set Birthday</h2>
          <form onSubmit={submit}>
            Select author:{" "}
            <select
              onChange={({ target }) => setSelectedAuthor(target.value)}
              defaultValue="default"
            >
              <option value="default" disabled>
                Author name
              </option>
              {result.data.allAuthors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <br></br>
            Born in:{" "}
            <input
              value={bornIn}
              onChange={({ target }) => setBornIn(target.value)}
            />
            <br></br>
            <button type="submit">Update Author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default AuthorsView
