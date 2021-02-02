import React, {useState} from "react";
import Numbers from "./Numbers";
import AddPersonForm from "./AddPersonForm";

const PhoneBook = ({initialPersons}) => {

    const [persons, setPersons] = useState(initialPersons.length>0 ? initialPersons : [])
    const [filter, setFilter] = useState('')

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
            <AddPersonForm persons={persons} setPersons={setPersons}/>
            <Numbers persons={personToShow}/>
        </div>
    )
}

export default PhoneBook