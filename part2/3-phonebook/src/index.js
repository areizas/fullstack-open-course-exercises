import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import axios from "axios";

const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
]
axios
    .get("http://localhost:3001/persons")
    .then( response => {
        const persons = response.data
        ReactDOM.render(<App initialPersons={persons}/>, document.getElementById('root'))
    })

