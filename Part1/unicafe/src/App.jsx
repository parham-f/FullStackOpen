import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }
  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }
  const increaseBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }

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

      <p>All {total}</p>
      <Average good={good} bad={bad} total={total}/>
      <Positiveness good={good} total={total}/>
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

const Average = ({good, bad, total}) => {
  const res = (good - bad) / total
  if (total === 0) {
    return (
      <p>
        Average 0
      </p>
    )
  }
  return (
    <p>
      Average {res}
    </p>
  )
}

const Positiveness = ({good, total}) => {
  const res = good / total * 100
  if (total === 0) {
    return (
      <p>
        Positive 0%
      </p>
    )
  }
  return (
    <p>
      Positive {res}%
    </p>
  )
}

export default App