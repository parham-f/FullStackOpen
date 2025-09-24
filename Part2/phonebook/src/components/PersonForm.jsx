import personService from '../services/personsServices'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault()

    if(props.persons.some(person => person.name === props.newName)) {
      props.setNewName('')
      props.setNewNumber('')
      return alert(`${props.newName} is already added to phonebook`)
    }

    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      props.setPersons(props.persons.concat(returnedPerson))
      props.setNewName('')
      props.setNewNumber('')
    })
  }
  return (
    <form onSubmit={addPerson}>
        <div>Name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

export default PersonForm