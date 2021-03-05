const mongoose =require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () =>{
    await Note.deleteMany({})

    // This execute the promises in parallel
    // const noteObjects = helper.initialNotes.map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    // This execute the promises in order
    for (let note of helper.initialNotes) {
        let newNote = new Note(note)
        await newNote.save()
    }
})

afterAll(()=>{
    mongoose.connection.close()
})

describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map( r => r.content)
        expect(contents).toContain('Browser can execute only Javascript')
    })
})

describe('viewing a specific note', () => {
    test('a specific note can be viewed', async ()=>{
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

        expect(resultNote.body).toEqual(processedNoteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('When user is not authenticated addition of a new note', () => {
    test('failed when a valid note is sent without token', async ()=>{
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(401)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })

    test('failed when an invalid note is sent without token', async ()=>{
        const newNote = {
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(401)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('When user is authenticated addition of a new note', () => {

    beforeEach(async () =>{
        await User.deleteMany({})
        await api.post('/api/users').send(helper.fakeUser).expect(200)
    })

    test('a valid note can be added', async ()=>{
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true
        }

        const tokenResponse = await api.post('/api/login')
                                        .send(helper.fakeUser).expect(200)
        const token = tokenResponse.body.token
        await api
            .post('/api/notes')
            .send(newNote)
            .set({ Authorization: `Bearer ${token}` })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain('async/await simplifies making async calls')
    })

    test('note without an authenticated user is not added', async ()=>{
        const newNote = {
            important: true
        }

        const tokenResponse = await api
            .post('/api/login')
            .send(helper.fakeUser)

        const token = tokenResponse.body.token

        await api
            .post('/api/notes')
            .send(newNote)
            .set({ Authorization: `Bearer ${token}` })
            .expect(400)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1 )

        const contents = notesAtEnd.map( r => r.body )
        expect(contents).not.toContain(noteToDelete.content)

    })
})