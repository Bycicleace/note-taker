const fs = require('fs');           // for writing to file
const path = require('path');       // for ease of directory paths
const nanoid = require('nanoid');   // for generating unique ID's

// returns a single note based on ID
function findById(id, notesArray) {
    let note = notesArray.filter(note => note.id === id)[0];
    return note;
}

// writes a note object to the json file
function createNewNote(body, notesArray) {

}

// updates the note specified by ID to what the body is.
function updateNote(id, body, notesArray) {

}

// deletes the specified note from the notes
function deleteNote(id, notesArray) {

}

// Validates a note object. Both title and text are required strings.
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    findById,
    createNewNote,
    updateNote,
    deleteNote,
    validateNote
}