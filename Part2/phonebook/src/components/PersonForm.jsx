import personService from '../services/personsServices'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: props.newName,
      number: props.newNumber
    }
    if(props.persons.some(person => person.name === props.newName)) {
      if(confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = props.persons.find(person => person.name === props.newName)               
        personService.update(personToUpdate.id, personObject).then(() => {
          props.setPersons(props.persons.filter(person => person.name === props.newName ? person.number = props.newNumber : person))
          props.setErrorMessage(
            `${props.newName} updated!`
          )
          setTimeout(() => {
            props.setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        props.setPersons(props.persons.concat(returnedPerson))
        props.setErrorMessage(
            `${props.newName} created!`
          )
          setTimeout(() => {
            props.setErrorMessage(null)
          }, 5000)
      })
    }
    props.setNewName('')
    props.setNewNumber('')
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