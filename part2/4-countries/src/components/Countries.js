import React from 'react'
import Country from "./Country";

const Countries = ({countriesToShow}) => {

    return (
        <div>
            {countriesToShow.map( country => <Country key={country.name} country={country}/>)}
        </div>
    )
}

export default Countries