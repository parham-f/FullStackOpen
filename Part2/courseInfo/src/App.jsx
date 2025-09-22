const Header = (props) => <h2>{props.name}</h2>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => <div><Part part={props.part} /></div>

const Total = (props) => <h4>Total of {props.parts.reduce((s, p) => s + p.exercises, 0)} exercises</h4>

const Course = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map(course => {
        return (          
          <div key={course.id}>
            <Header name={course.name} id={course.id} />
            {course.parts.map(part => <Content key={part.id} part={part} />)}
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App