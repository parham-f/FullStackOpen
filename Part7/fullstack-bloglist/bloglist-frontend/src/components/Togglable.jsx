import { useState, useImperativeHandle } from "react"
import { Button } from "@mui/material"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? "none" : "inline-block",
  }
  const showWhenVisible = {
    display: visible ? "" : "none",
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  if (props.visibleByDefault) {
    toggleVisibility()
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <Button
          style={{
            marginTop: 5,
            border: "2px solid",
            fontSize: "15px",
          }}
          variant="outlined"
          color="inherit"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={{
            marginTop: 5,
            marginBottom: 5,
            border: "2px solid",
            fontSize: "15px",
          }}
          variant="outlined"
          color="secondary"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable
