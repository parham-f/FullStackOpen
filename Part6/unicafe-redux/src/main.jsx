import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleFunc = (act) => 
    store.dispatch({
      type: act
    })

  return (
    <div>
      <button onClick={() => handleFunc('GOOD')}>good</button> 
      <button onClick={() => handleFunc('OK')}>ok</button> 
      <button onClick={() => handleFunc('BAD')}>bad</button>
      <button onClick={() => handleFunc('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
