const ShowCountries = props => {
    const matchedCountries = props.country.map(country => <li key={country.name.common}>{country.name.common}</li>)    

    if(matchedCountries.length > 10)
        return (
            <p>Too many matches, specify another filter</p>
        )
    if(matchedCountries.length === 1) {
        const matchedCountry = props.country.filter(country => country.name.common === matchedCountries[0].key)[0]
        const languages = Object.values(matchedCountry.languages)
        return (
            <div>
                <h1>{matchedCountry.name.common}</h1>
                <li>Capital {matchedCountry.capital}</li>
                <li>Area {matchedCountry.area}</li>
                <h2>Languages</h2>
                <ul>
                    {languages.map(lan => <li key={lan}>{lan}</li>)}
                </ul>
                <img src={matchedCountry.flags.svg} alt="Flag" width="200" height="200"></img>
            </div>
        )
    }

    return (
        matchedCountries
    )
}

export default ShowCountries