const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>Name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

export default PersonForm