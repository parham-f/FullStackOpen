import { useState } from "react"

// const LoginForm = ({ setUser }) => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   const dispatch = useDispatch()

//   const handleLogin = async (event) => {
//     event.preventDefault()

//     try {
//       const user = await loginService.login({ username, password })
//       window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
//       blogService.setToken(user.token)
//       setUser(user)
//       dispatch(showNotification("Successful Login", 5, false))
//       setUsername("")
//       setPassword("")
//     } catch {
//       dispatch(showNotification("Wrong Username or Password", 5, true))
//       setUsername("")
//       setPassword("")
//     }
//   }

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <div>
//           <label>
//             Username
//             <input
//               type="text"
//               value={username}
//               onChange={({ target }) => setUsername(target.value)}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={({ target }) => setPassword(target.value)}
//             />
//           </label>
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   )
// }

// export default LoginForm

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
