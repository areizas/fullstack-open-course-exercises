const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response, next) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
    const note = await Note.findById(request.params.id)
    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/',async (request, response, next) => {
    const body = request.body
    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })

    const savedNote = await note.save()
    response.json(savedNote)

})

notesRouter.put('/:id',(request, response,next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new : true })
        .then( updatedNote => response.json(updatedNote))
        .catch( error => next(error) )
})

notesRouter.delete('/:id', async (request, response, next) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = notesRouter