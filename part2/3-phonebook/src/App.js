import React from "react";
import PhoneBook from "./components/Phonebook";

const App = () => {

    const initialPersons = [
        { name: 'Arto Hellas', number: '040-1234567'}
    ]

    return (
        <>
            <PhoneBook initialPersons={initialPersons}/>
        </>
    )
}

export default App