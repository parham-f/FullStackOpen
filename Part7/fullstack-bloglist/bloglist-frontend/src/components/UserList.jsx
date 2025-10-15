import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import usersServices from "../services/users"
import LoginForm from "./LoginForm"
import { login, logout } from "../reducers/userReducer"

const UserList = () => {
  const loggedInUser = useSelector((state) => state.user)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const load = async () => {
      setUsers(await usersServices.getAll())
    }
    load()
  }, [])

  const handleLogin = async (username, password) => {
    dispatch(login({ username, password }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {!loggedInUser && <LoginForm onLogin={handleLogin} />}
      {loggedInUser && (
        <div>
          <p>{loggedInUser.name} logged in</p>
          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}
      <h2>Users</h2>
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
