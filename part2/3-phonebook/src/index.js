import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const handleOnChange = (event) => {
        setNewName(event.target.value)
    }

    const addNewPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }

    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addNewPerson}>
                <div>
                    Name: <input
                                value={newName}
                                onChange={handleOnChange}
                            />
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map( person => <p key={person.name}>{person.name}</p>)}
            </div>

        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
