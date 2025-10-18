import { useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client/react"
import { useState } from "react"

const AuthorsView = ({ token }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [bornIn, setBornIn] = useState("")

  const { data, loading, error } = useQuery(ALL_AUTHORS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  })
  if (error) console.error("ALL_AUTHORS error:", error)

  const authors = (data?.allAuthors ?? []).filter(Boolean)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (loading) return <div>loading...</div>

  const submit = (e) => {
    e.preventDefault()
    if (!selectedAuthor || !bornIn) return
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
          {authors.map((a) => (
            <tr key={a.id ?? a.name}>
              <td>{a.name}</td>
              <td>{a.born ?? "-"}</td>
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
              value={selectedAuthor || "default"}
              onChange={({ target }) => setSelectedAuthor(target.value)}
            >
              <option value="default" disabled>
                Author name
              </option>
              {authors.map((a) => (
                <option key={a.id ?? a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <br />
            Born in:{" "}
            <input
              value={bornIn}
              onChange={({ target }) => setBornIn(target.value)}
              type="number"
            />
            <br />
            <button type="submit">Update Author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default AuthorsView
