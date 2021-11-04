const { notes } = require('../../db/db.json');
const router = require('express').Router();
const {
    findById,
    createNewNote,
    updateNote,
    deleteNote,
    validateNote
} = require("../../lib/notes.js");

// Retrieve all notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Create or Update note
router.post('/notes', (req, res) => {
    // post a new note to the db.json file.
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not formatted correctly');
    } else {
        // --> Commented out as update is not possible yet. Left for future <--
        // if an ID is supplied and found, update note, else, create a new one.
        // if (req.body.id) {
        //     if (findById(req.body.id, notes)) {
        //         const note = updateNote(req.body.id, req.body, notes);
        //         res.json(note);
        //     } else {
        //         const note = createNewNote(req.body, notes);
        //         res.json(note);
        //     }
        // } else {
            const note = createNewNote(req.body, notes);
            res.json(note);
        // }   
    }
});

// Get specific note
router.get('/notes/:id', (req, res) => {
    // return note by ID only
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// Delete specific note
router.delete('/notes/:id', (req, res) => {
    const selectedNote = findById(req.params.id, notes);
    // If the note is located, then proceed
    if (selectedNote) {
        const result = deleteNote(req.params.id, notes);
        const selectedNote2 = findById(req.params.id, notes);
        // If the note is still found after deletion, then error, else return notes array
        if (selectedNote2) {
            res.status(400).send('Deletion was unsuccessful');
        } else {
            res.json(result);
        }
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;