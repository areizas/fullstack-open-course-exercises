import React from 'react'
import Countries from "./Countries";
import CountryInformation from "./CountryInformation";

const Filter = ({countriesToShow}) => {

    if (countriesToShow.length>10){
        return(
            <div>Too many matches, please specify another filter</div>
        )
    } else if (countriesToShow.length===0){
        return(
            <div>No data to show</div>
        )
    } else if (countriesToShow.length === 1){
        return(
            <CountryInformation country={countriesToShow[0]}/>
        )
    } else {
        return (
            <Countries countriesToShow={countriesToShow}/>
        )
    }

}

export default Filter