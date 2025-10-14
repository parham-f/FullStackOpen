import { useState, useImperativeHandle } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? "none inline-block" : "inline-block",
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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
}

export default Togglable
