import { useState } from "react"
import { TextField, Button } from "@mui/material"

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
      <div style={{ marginTop: 5 }}>
        <TextField
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          color="inherit"
        />
      </div>
      <div style={{ marginTop: 5 }}>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="inherit"
        />
      </div>
      <Button
        style={{ marginTop: 5, border: "2px solid", fontSize: "15px" }}
        variant="outlined"
        color="inherit"
        type="submit"
      >
        login
      </Button>
    </form>
  )
}

export default LoginForm
