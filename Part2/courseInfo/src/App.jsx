const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => props.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

const Content = (props) => <div><Part parts={props.parts} /></div>

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />    
      <Content parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App