import React, {useState, useEffect} from "react";
import axios from "axios";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

const PhoneBook = () => {

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then( response => {
                const data = response.data
                setPersons(data)
            })
    },[])

    const handleOnChangeFilter = (event) => setFilter(event.target.value)
    const personToShow = filter.length>0
        ? persons.filter(person => person.name.includes(filter))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input value={filter} onChange={handleOnChangeFilter}/>
            </div>
            <h3>Add a new person</h3>
            <PersonForm persons={persons} setPersons={setPersons}/>
            <Persons persons={personToShow}/>
        </div>
    )
}

export default PhoneBook