const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
let noteData = require('../db/db.json');
const uuid = require('..//helpers/util');
const { nextTick } = require('process');


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
notes.post('/notes', (reg, res) => {
    console.log(`${req.method} request to add note recieved.`);
    console.log(req.body);

    const {title, text} = reg.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        noteData.push(newNote);

        const allNotes =JSON.stringify(noteData, null, 2);

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

    console.log('${req} request recieved');
    let result = noteData.filter((note) => note.id === noteId);
    res.json(result);
});