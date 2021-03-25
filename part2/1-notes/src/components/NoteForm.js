import React, { useState } from "react";
import noteService from "../services/notes";

const NoteForm = ({notes, setNotes}) => {

    const [newNote, setNewNote] = useState('a new note...')

    const handleOnChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random()<0.5
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    return (
        <form onSubmit={addNote}>
            <input
                value={newNote}
                onChange={handleOnChange}
            />
            <button type="submit">save</button>
        </form>
    )
}

export default NoteForm