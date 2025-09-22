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

export default Course