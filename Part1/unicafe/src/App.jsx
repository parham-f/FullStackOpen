import { useState } from 'react'

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td><h1>Statistics</h1></td>
        </tr>
        <tr>
          <Display label='Good' counter={good}/>
        </tr>
        <tr>
          <Display label='Neutral' counter={neutral}/>
        </tr>
        <tr>
          <Display label='Bad' counter={bad}/>
        </tr>
        <tr>
          <td>All</td>
          <td>{total}</td>
        </tr>
        <tr>
          <Average good={good} bad={bad} total={total}/>
        </tr>
        <tr>
          <Positiveness good={good} total={total}/>
        </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = props => <><td>{props.label}</td><td>{props.counter}</td></>

const Average = ({good, bad, total}) => {
  const res = (good - bad) / total
  return (
    <>
      <td>Average</td>
      <td>{res}</td>
    </>
  )
}

const Positiveness = ({good, total}) => {
  const res = good / total * 100
  return (
    <>
      <td>Positive</td>
      <td>{res}%</td>
    </>
  )
}

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

      <Button onClick={increaseGood} text='Good'/>
      <Button onClick={increaseNeutral} text='Neutral'/>     
      <Button onClick={increaseBad} text='Bad'/>
      
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App