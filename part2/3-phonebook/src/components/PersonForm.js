import React, {useState} from "react";
import personsService from '../services/persons'
import Notification from "./Notification";

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [addPersonMessage, setAddPersonMessage] = useState(null)
    const [notificationClass, setNotificationClass] = useState('addNewPerson')

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
                    .catch(returnedPerson => {
                        setNotificationClass('error')
                        setAddPersonMessage(`Information of ${existingPerson.name} has already been removed from server`)
                        setTimeout(()=>setAddPersonMessage(null),5000)
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
                    setNotificationClass('addNewPerson')
                    setAddPersonMessage(`Added ${returnedPerson.name}`)
                    setTimeout(()=>setAddPersonMessage(null),5000)
                })
                .catch(error => {
                    setNotificationClass('error')
                    setAddPersonMessage(`${error.response.data.error}`)
                    setTimeout(()=>setAddPersonMessage(null),10000)
                })
        }
    }
    return (
        <div>
            <Notification message={addPersonMessage} notificationClass={notificationClass}/>
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
        </div>
    )
}

export default PersonForm