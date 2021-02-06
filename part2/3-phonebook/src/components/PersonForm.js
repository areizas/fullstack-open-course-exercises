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
            const existingPerson = persons.filter( p => p.name === newName)[0]
            if(window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
                const personObject = {
                    name: existingPerson.name, number: newNumber
                }
                personsService
                    .update(existingPerson.id,personObject)
                    .then( returnedPerson => {
                        setPersons(persons.map( person => person.id === returnedPerson.id ? returnedPerson : person))
                        setNewName('')
                        setNewNumber('')
                    })
            }
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