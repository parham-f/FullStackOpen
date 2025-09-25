import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/personsServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

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
      <Notification message={errorMessage} />
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} 
                  setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} 
                  handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                  setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2> 
      <Persons persons={persons} setPersons={setPersons} showAll={showAll} newFilter={newFilter}/>
    </div>
  )
}

export default App