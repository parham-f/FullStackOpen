import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import {
  ME,
  RECOMMENDED_BOOKS,
  SET_FAVORITE_GENRES,
  ADD_FAVORITE_GENRE,
  REMOVE_FAVORITE_GENRE,
} from "../queries"

export function GenrePreferences({ allGenres = [] }) {
  const { data } = useQuery(ME)
  const current = data?.me?.favoriteGenres ?? []
  const [input, setInput] = useState("")

  const [setFavs] = useMutation(SET_FAVORITE_GENRES, { refetchQueries: [ME] })
  const [addFav] = useMutation(ADD_FAVORITE_GENRE, {
    refetchQueries: [ME, RECOMMENDED_BOOKS],
  })
  const [removeFav] = useMutation(REMOVE_FAVORITE_GENRE, {
    refetchQueries: [ME, RECOMMENDED_BOOKS],
  })

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Your liked genres</h3>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}
      >
        {current.length === 0 && <span>(none yet)</span>}
        {current.map((g) => (
          <button
            key={g}
            onClick={() => removeFav({ variables: { genre: g } })}
          >
            {g} ✕
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="Add genre (e.g., refactoring)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            const v = input.trim()
            if (v) addFav({ variables: { genre: v } })
            setInput("")
          }}
        >
          Add
        </button>
        <button
          onClick={() =>
            setFavs({
              variables: { genres: Array.from(new Set(current)) },
            })
          }
        >
          Save
        </button>
      </div>

      {!!allGenres.length && (
        <div style={{ marginTop: 12 }}>
          <div>Quick pick:</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {allGenres.map((g) => (
              <button
                key={g}
                onClick={() => addFav({ variables: { genre: g } })}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RecommendedView({ allGenres = [] }) {
  const { data: meData, loading: meLoading } = useQuery(ME)
  const { data, loading, error } = useQuery(RECOMMENDED_BOOKS)

  if (meLoading || loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const liked = meData?.me?.favoriteGenres ?? []
  const books = data?.recommendedBooks ?? []

  return (
    <div>
      <h2>Recommended for you</h2>
      <p>Based on your liked genres: {liked.join(", ") || "(none set)"}</p>

      {books.length === 0 ? (
        <div>No recommendations yet. Like some genres to get started.</div>
      ) : (
        <table>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author?.name}</td>
                <td>{b.published}</td>
                <td>{(b.genres || []).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <GenrePreferences allGenres={allGenres} />
    </div>
  )
}
