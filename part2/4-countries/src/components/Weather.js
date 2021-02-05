import React, {useState,useEffect} from 'react'
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY_WEATHER_STACK

const Weather = ({country}) => {

    const [weather, setWeather] = useState({})

    useEffect(()=>{
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
            .then( response => {
                const data = response.data
                console.log(data)
                setWeather(data)
            })
    },[])

    return(
        <div>
            <h2>Weather in {country.name}</h2>
            <p><b>Temperature:</b> {weather.current.temperature} </p>
            <div>
                <p><b>{weather.current.weather_descriptions}</b></p>
                <img src={weather.current.weather_icons[0]} width="100" height="100"></img>
            </div>
            <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather