const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

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
        console.log(typeof db);
        res.json(JSON.parse(db));
    }).catch(err => console.error(err));
});

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add note`);
    console.info(`${req.method} request received to add note`);
    console.log(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
    res.json(`${req.method} request received to delete note id:${req.params.id}`);
    console.info(`${req.method} request received to delete note id:${req.params.id}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Listening for requests at http://localhost:${PORT}! 🌳🐿`)
);