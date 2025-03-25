const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let notes = [];

app.get('/', (req, res) => {
    res.render('index', { title: 'Simple Notes App', notes });
});

app.post('/add-note', (req, res) => {
    const { note, category, color } = req.body;
    if (note) {
        notes.push({ 
            text: note, 
            timestamp: new Date().toLocaleString(), 
            category: category || null,
            color: color || '#ffffff'
        });
    }
    res.redirect('/');
});

app.post('/delete-note', (req, res) => {
    const { index } = req.body;
    if (index !== undefined) {
        notes.splice(index, 1);
    }
    res.redirect('/');
});

app.post('/edit-note', (req, res) => {
    const { index, newText } = req.body;
    if (index !== undefined && newText) {
        notes[index].text = newText;
    }
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});