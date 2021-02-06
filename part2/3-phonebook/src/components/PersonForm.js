import React, {useState} from "react";
import personsService from '../services/persons'

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleOnChangeNewName = (event) => {
        setNewName(event.target.value)
    }
    const handleOnChangeNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const addNewPerson = (event) => {
        event.preventDefault()
        if (persons.some( (person) => person.name === newName)){
            alert(newName + " is already added to phonebook")
        } else{
            const personObject = {
                name: newName, number: newNumber
            }

            personsService
                .create(personObject)
                .then( returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }
    return (
        <form onSubmit={addNewPerson}>
            <div>
                Name: <input
                value={newName}
                onChange={handleOnChangeNewName}
            />
            </div>
            <div>
                Number: <input
                value={newNumber}
                onChange={handleOnChangeNewNumber}
            />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm