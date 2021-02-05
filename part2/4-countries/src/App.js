import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {

    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(()=>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                const data = response.data
                setCountries(data)
            })
    },[])

    const handleOnChangeFilter = (event) => setFilter(event.target.value)
    const countriesToShow = countries.filter( country => country.name.toLowerCase().includes(filter))

    return (
        <>
            <div>
                Find countries <input
                    value={filter}
                    onChange={handleOnChangeFilter}
                />
            </div>
            <Filter countriesToShow={countriesToShow}/>
        </>
    )
}

export default App