import React from 'react'
import Countries from "./Countries";

const Filter = ({countriesToShow}) => {

    const displayFilteredData = () => {
        if (countriesToShow.length>10){
            return(
                <div>Too many matches, please specify another filter</div>
            )
        } else if (countriesToShow.length===0){
            return(
                <div>No data to show</div>
            )
        }else {
            return(
                <Countries countriesToShow={countriesToShow} />
            )
        }
    }

    return (
        <div>
            {displayFilteredData()}
        </div>
    )
}

export default Filter