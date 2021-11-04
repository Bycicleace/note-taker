const fs = require('fs');
const {
    findById,
    createNewNote,
    updateNote,
    deleteNote,
    validateNote
} = require('../lib/notes.js');
const { notes } = require("../db/db.json");

jest.mock('fs');

// findById
test("Find By ID", () => {
    let notesArray = [
        {
            title: "Note 1",
            text: "First Note",
            id: "5e44bee2"
        },
        {
            title: "Note 2",
            text: "Second Note",
            id: "8425e4d6"
        },
        {
            title: "Note 3",
            text: "Third Note",
            id: "0a989eb6"
        }
    ];

    let note = findById("8425e4d6", notesArray);

    expect(note.title).toBe("Note 2");
    expect(note.text).toBe("Second Note");
    expect(note.id).toBe("8425e4d6");
});


// createNewNote
test("Create New Note", () => {
    const note = createNewNote(
        {
            title: "New Note",
            text: "This is a new note!!"
        },
        notes
    );

    expect(note.title).toBe("New Note");
    expect(note.text).toBe("This is a new note!!");
    expect(note.id).toEqual(expect.any(String));
});

// updateNote
test("Updates a current Note", () => {
    let notesArray = [
        {
            title: "Note 1",
            text: "First Note",
            id: "5e44bee2"
        },
        {
            title: "Note 2",
            text: "Second Note",
            id: "8425e4d6"
        },
        {
            title: "Note 3",
            text: "Third Note",
            id: "0a989eb6"
        }
    ];

    // Update first note
    const newFirstNote = updateNote("5e44bee2", {
        title: "Note 1",
        text: "This is the First Note"
    }, notesArray);

    expect(newFirstNote.text).toBe("This is the First Note");
    expect(notesArray[0].text).toBe("This is the First Note");
    expect(notesArray[0].id).toBe("5e44bee2");


    // Update second (middle) note
    const newSecondNote = updateNote("8425e4d6", {
        title: "Note 2",
        text: "This is the Second Note"
    }, notesArray);

    expect(newSecondNote.text).toBe("This is the Second Note");
    expect(notesArray[1].text).toBe("This is the Second Note");
    expect(notesArray[1].id).toBe("8425e4d6");


    // Update last note
    const newLastNote = updateNote("0a989eb6", {
        title: "Note 3",
        text: "This is the Last Note"
    }, notesArray);

    expect(newLastNote.text).toBe("This is the Last Note");
    expect(notesArray[2].text).toBe("This is the Last Note");
    expect(notesArray[2].id).toBe("0a989eb6");
});


// deleteNote
test("Deletes a note", () => {
    index = notes[0].id;

    expect(notes.findIndex(element => element.id === index) > -1); // verifies that the index successfully mapped over.

    const outArray = deleteNote(index, notes);

    expect(outArray.findIndex(element => element.id === index) === -1); // note should not be in returned array.
    expect(notes.findIndex(element => element.id === index) === -1); // note is no longer in notes.
});


// validateNote
test("validates a note", () => {
    const validNote = {
        title: "Note 1",
        text: "First Note"
    }

    const invalidNote = {
        title: "",
        text: "Second Note"
    }

    const invalidNote2 = {
        title: "Note 2",
        text: ""
    }

    const invalidNote3 = {
        title: "Note 2",
        text: 5
    }

    const result = validateNote(validNote);
    const result2 = validateNote(invalidNote);
    const result3 = validateNote(invalidNote2);
    const result4 = validateNote(invalidNote3);

    expect(result).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
});