const { db } = require('../../db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    // return all notes
    // return notes by query
});

router.get('/notes/:id', (req, res) => {
    // return note by ID only
});

router.post('/notes', (req, res) => {
    // post a new note to the db.json file.
});

module.exports = router;