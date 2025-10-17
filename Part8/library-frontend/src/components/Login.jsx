import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client/react"
import { LOGIN } from "../queries"
import { useNavigate } from "react-router-dom"

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      const msg =
        error?.graphQLErrors?.[0]?.message ??
        error?.networkError?.message ??
        "Wrong username or password"
      setError(msg)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
      setUsername("")
      setPassword("")
      setError("")
    }
  }, [result.data, setToken])

  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  )
}

export default Login
