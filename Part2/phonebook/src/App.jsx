import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-123456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} 
                  setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} 
                  handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2> 
      <Persons persons={persons} showAll={showAll} newFilter={newFilter}/>
    </div>
  )
}

export default App