import {useEffect} from 'react'
import axios from 'axios'

const GetWeather = props => {
    const api_key = import.meta.env.VITE_SOME_KEY
    let weather = {}
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country}&appid=${api_key}&units=metric`)
        .then(response => {
          props.setWeather(response.data)         
        })
  }, [props.country])

  const weatherIconSrc = `https://openweathermap.org/img/wn/${props.weather?.weather[0].icon ?? '—'}@2x.png`
  return (
    <div>
        <p>Temperature {props.weather?.main.temp ?? '—'} Celsius</p>
        <img src={weatherIconSrc} alt="Weather" width="100" height="100"></img>
        <p>Wind {props.weather?.wind.speed ?? '—'} m/s</p>
    </div>
  )
}

export default GetWeather