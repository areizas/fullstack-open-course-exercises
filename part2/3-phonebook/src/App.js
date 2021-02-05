import React from "react";
import PhoneBook from "./components/Phonebook";

const App = ({initialPersons}) => {

    return (
        <>
            <PhoneBook initialPersons={initialPersons}/>
        </>
    )
}

export default App