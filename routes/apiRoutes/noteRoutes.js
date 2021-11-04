const { notes } = require('../../db/db.json');
const router = require('express').Router();
const {
    findById,
    createNewNote,
    updateNote,
    deleteNote,
    validateNote
} = require("../../lib/notes.js");

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    // return note by ID only
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    // post a new note to the db.json file.
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not formatted correctly');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

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