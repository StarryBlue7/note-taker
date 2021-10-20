const express = require('express');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.delete('/api/notes/:id', (req, res) => {

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`Listening for requests at http://localhost:${PORT}!`)
);
