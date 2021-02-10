import React, {useState, useEffect} from "react";
import axios from "axios";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import personsService from "../services/persons";

const PhoneBook = () => {

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then( returnedData => {
                setPersons(returnedData)
            })
    },[])

    const handleDeleteButton = (person) => {
        if(window.confirm(`Delete ${person.name} ?`)){
            personsService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter( p => p.id !== person.id))
                })
        }
    }

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
            <Persons persons={personToShow} handleDeleteButton={handleDeleteButton}/>
        </div>
    )
}

export default PhoneBook