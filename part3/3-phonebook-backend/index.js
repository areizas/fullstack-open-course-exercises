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

app.get('/api/persons', (request,response,next)=>{
    Person.find({})
        .then( persons => {
            response.json(persons)
        })
        .catch( error => {
            next(error)
        })

})

app.get('/api/persons/:id',(request,response,next)=>{
    Person.findById(request.params.id)
        .then( person => {
            if(person){
                response.json(person)
            } else {
                response.status(404).end()
            }

        })
        .catch( error => {
            next(error)
        })
})

app.delete('/api/persons/:id',(request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch( error => {
            next(error)
        })
})

const generateRandomId = () => Math.floor(Math.random()*10000)

app.post('/api/persons',(request,response,next)=>{
    const body = request.body
    const personExists = () => {
        return Person.find({})
            .then(persons => {
                return persons.some(p => p.name === body.name)
            })
            .catch( error => {
                next(error)
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
        .catch( error => {
            next(error)
        })
})

app.put('/api/persons/:id',(request, respose, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id,person,{new: true})
        .then( updatedPerson => {
            respose.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.get('/info',(request, response)=>{
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>   
    `)
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        response.status(400).send({error:"malformed id"})
    }

    next(error)
}

// app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})