import CountryDetail from "./CountryDetail"

const ShowCountries = props => {
    const matchedCountries = props.country.map(country => {
        return(
            <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => props.setShowButton(country.name.common)}>Show</button>
            </li>
        )
})    

    if(matchedCountries.length > 10)
        return (
            <p>Too many matches, specify another filter</p>
        )
    if(matchedCountries.length === 1) {
        return <CountryDetail country={props.country} matchedCountries={matchedCountries} showButton={props.showButton} weather={props.weather} setWeather={props.setWeather}/>
    }
    if(props.showButton !== '') {        
        return <CountryDetail country={props.country} matchedCountries={matchedCountries} showButton={props.showButton} weather={props.weather} setWeather={props.setWeather}/>
    }
    return (
        matchedCountries
    )
}

export default ShowCountries