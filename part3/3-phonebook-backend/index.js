require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request,response)=>{
    Person.find({})
        .then( persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id)
        .then( person => {
            response.json(person)
        })
        .catch(error => {
            response.status(404).end()
        })
})

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)

    if(!persons.some(p => p.id === id)){
        response.status(404).end()
    }

    persons = persons.filter( person => person.id !== id)
    response.status(204).end()
})

const generateRandomId = () => Math.floor(Math.random()*10000)

app.post('/api/persons',(request,response)=>{
    const body = request.body
    const personExists = () => {
        return Person.find({})
            .then(persons => {
                return persons.some(p => p.name === body.name)
            })
    }

    if(!(body.name && body.number)){
        return response.status(400).json({"error":"Name of Number missing"})
    } else if(personExists()){
        return response.status(400).json({"error":"Name must be unique"})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateRandomId()
    })

    person.save()
        .then(returnPerson => {
            response.json(person)
        })
})

app.get('/info',(request, response)=>{
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>   
    `)
})

const PORT = process.env.PORT || 3001

app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})