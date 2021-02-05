import React from 'react'
import Country from "./Country";

const Countries = ({countriesToShow}) => {

    const showCountries = () => {
        if (countriesToShow.length === 1){
            return(
                <Country props={countriesToShow}/>
            )
        } else{
            return (
                <ul>
                    {countriesToShow.map( country => (
                        <li key={country.name}> <b>{country.name}</b></li>
                    ))}
                </ul>
            )
        }
    }

    return (
        <>
            {showCountries()}
        </>
    )
}

export default Countries