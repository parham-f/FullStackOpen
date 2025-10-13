import { useState } from "react"

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = (e) => {
    e.preventDefault()
    onLogin(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={submit}>
      <div>
        username{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
