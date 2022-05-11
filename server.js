const express = require('express');
const path = require('path');
const fs = require('fs');
// refer to database seed
const notes = require('./db/db.json');
// set up port
const PORT = process.env.PORT || 3001;
// instantiate an express app
const app = express()
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(info, notesArray) {
    const newNote = info;
    notesArray.push(writtenNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
};

// function to find a note given its ID, needed for delete func
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id === id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

// routes for api
app.get('/notes', (req,res) => {
    res.json(notes);
});

// delete router
// router.get('/notes/:id', (req,res) => {
//     let notes = db;

// });

// app.post('/notes', (req, res) => {
//     req.body.id = db.length.toString();
//     const newNote = {
//         title = req.body.title,
//         text = req.body.text
//     }
//     res.json(newNote);
// })



// routes for html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listen to the port for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});