import React from 'react'
import Weather from "./Weather";

const CountryInformation = ({country}) => {
    return (
        <>
            <h1>{country.name}</h1>
            <div>
                <p><b>Capital:</b> {country.capital}</p>
                <p><b>Population:</b> {country.population}</p>
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map( language => (
                        <li key={language.name}>{language.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img key={country.name} src={country.flag} width="150" height="150"></img>
            </div>
            <Weather country={country}/>
        </>
    )
}

export default CountryInformation