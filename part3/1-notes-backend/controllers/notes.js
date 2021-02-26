const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response, next) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
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

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false,
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

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