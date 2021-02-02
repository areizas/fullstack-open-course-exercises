import React, {useState} from "react";
import Numbers from "./Numbers";

const PhoneBook = ({initialPersons}) => {

    const [persons, setPersons] = useState(initialPersons.length>0 ? initialPersons : [])
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
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            <Numbers persons={persons}/>
        </div>
    )
}

export default PhoneBook