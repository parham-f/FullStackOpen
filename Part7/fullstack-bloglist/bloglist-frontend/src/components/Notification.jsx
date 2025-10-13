import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    color: notification.isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div>
      {notification.message && <div style={style}>{notification.message}</div>}
    </div>
  )
}

export default Notification
