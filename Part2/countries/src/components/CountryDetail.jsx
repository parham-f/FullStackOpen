const CountryDetail = props => {
    let matchedCountry = props.country.filter(country => country.name.common === props.matchedCountries[0].key)[0]
    if(props.showButton !== '') {
        matchedCountry = props.country.filter(country => country.name.common === props.showButton)[0]
    }
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

export default CountryDetail