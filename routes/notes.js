const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
let noteData = require('../db/db.json');
const uuid = require('..//helpers/util');



// get data from the DB

notes.get('/notes', (req, res) => {
    console.log(`${req.method} request for notes recieved`);

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, dbNote) => {
        if (err) {
            console.error(err);
        } else {
            noteData = JSON.parse(dbNote);
            res.send(dbNote);
        }
    });
})
//post route
notes.post('/notes', (req, res) => {
    console.log(`${req.method} request to add note recieved.`);
    console.log(req.body);

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        noteData.push(newNote);

        const allNotes = JSON.stringify(noteData, null, 2);

        fs.writeFile(path.join(__dirname, '../db/db.json'), allNotes, (err) => {
            err ? console.error(err) : console.log(`Note titled: '${newNote.title}' has been posted in JSON file`)
        })
        res.json('Note Added');
    } else {
        res.json('Error')
    }
});
// GET route
notes.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    console.log(`${req} request for notes has been received`);
    let result = noteData.filter((note) => note.id === noteId);
    res.json(result);
});


//delete note

notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    if (noteId) {
        console.log(noteId);
        console.log(noteData);
        let deleteNoteId = noteData.filter((note) => note.id !== noteId);
        console.log(noteData);
        const allNotes = JSON.stringify(deleteNoteId, null, 2);
        console.log(allNotes);
        fs.writeFile(path.join(__dirname, '../db/db.json'), allNotes, (err) => {
            if (err) {
                console.error(err);
                res.json(err);
            } else {
                console.log(`Note ${noteId} has been deleted`);
                res.json(deleteNoteId);
            }
        });
    }
});

module.exports = notes;