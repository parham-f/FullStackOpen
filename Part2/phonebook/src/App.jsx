import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      setNewName('')
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    if(event.target.value === '') {
      setNewFilter('')
      return setShowAll(true)
    }
    setShowAll(false)
    setNewFilter(event.target.value)
  }
  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h2>PhoneBook</h2>
      <div>Filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameChange}/></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>      
      {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App