const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "1234",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }]

app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find( p => p.id === id)

    if(person){
        response.json(person)
    } else{
        response.status(404).end()
    }
})

const generateRandomId = () => Math.floor(Math.random()*10000)

app.post('/api/persons',(request,response)=>{
    const body = request.body

    if(!(body.name && body.number)){
        return response.status(404).json({"error":"Name of Number missing"})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId()
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/info',(request, response)=>{
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>   
    `)
})

const PORT = 3001

app.listen(PORT,() => {
    console.log(`App is runing on port ${PORT}`)
})