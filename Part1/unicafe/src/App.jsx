import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button
        onClick={increaseGood}
        text='Good'
      />
      <Button
        onClick={increaseNeutral}
        text='Neutral'
      />     
      <Button
        onClick={increaseBad}
        text='Bad'
      />

      <h1>Statistics</h1>
      
      <Display label='Good ' counter={good}/>
      <Display label='Neutral ' counter={neutral}/>
      <Display label='Bad ' counter={bad}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = props => <div>{props.label}{props.counter}</div>

export default App