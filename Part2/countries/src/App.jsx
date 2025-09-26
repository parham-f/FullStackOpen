import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState('')

    useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setAllCountries(response.data)       
        })
  }, [])

  const handleSearchChange = (event) => {
    if(event.target.value === '') {
      setCountry([])
      return setSearch('')
    }
    const newSearch = event.target.value
    setSearch(newSearch)
    setCountry(allCountries.filter(country => country.name.common.match(`^${newSearch}`)))
  }

  return (
    <div>
      <p>Find counties <input value={search} onChange={handleSearchChange}/></p>
      <ShowCountries country={country}/>
    </div>
  )
}

export default App