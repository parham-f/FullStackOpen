import { useSelector } from "react-redux"
import { Alert } from "@mui/material"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const sev = notification.isError ? "error" : "success"

  return (
    <div>
      {notification.message && (
        <Alert severity={sev}>{notification.message}</Alert>
      )}
    </div>
  )
}

export default Notification
