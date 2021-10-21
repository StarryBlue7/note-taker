const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./db/db.json');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);

    readFromFile('./db/db.json').then((db) => {
        res.json(JSON.parse(db));
    }).catch(err => console.error(err));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add note`);
    console.log(req.body);

    const newNote = {
        'title': req.body.title,
        'text': req.body.text,
        'id': uuid()
    }

    if (newNote.title) {
        readAndAppend(newNote, './db/db.json');
        res.json('Note added!');
    } else {
        res.error('Note missing title!');
    }
    
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.info(`${req.method} request received to delete note id: ${id}`);

    readFromFile('./db/db.json')
        .then((db) => JSON.parse(db))
        .then((json) => {
            const newDB = json.filter((note) => note.id !== id);
            writeToFile('./db/db.json', newDB);

            res.json(`Deleted note id: ${id}`);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Listening for requests at http://localhost:${PORT}! 🌳🐿`)
);