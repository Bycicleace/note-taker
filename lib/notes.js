const fs = require('fs');           // for writing to file
const path = require('path');       // for ease of directory paths

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 8);   // for generating unique ID's. Would have to generate 10,800 different IDs to have a 1% probability of collision.

// returns a single note based on ID
function findById(id, notesArray) {
    let note = notesArray.filter(note => note.id === id)[0];
    return note;
}

// writes a note object to the json file, then returns the note
function createNewNote(body, notesArray) {
    let note = body;
    let id = nanoid();
    
    // if there is a collision, id is regenerated until there is no collision.
    while (findById(id, notesArray)) {
        id = nanoid();
    }

    note.id = id;

    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// updates the note specified by ID to what the body is.
function updateNote(id, body, notesArray) {
    let newNote = body;
    newNote.id = id; // Just a precaution

    // Get index of note in notesArray
    let index = notesArray.findIndex(element => element.id === id);

    // Set the object at the index located to newNote
    notesArray[index] = newNote;

    // Write new notesArray to file.
    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
}

// deletes the specified note from the notes
function deleteNote(id, notesArray) {
    let index = notesArray.findIndex(element => element.id === id);

    notesArray.splice(index,1);

    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
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