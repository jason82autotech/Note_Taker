const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);


//write your api routes here

/////// CODE HERE ///////
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading file');
      }
      res.json(JSON.parse(data));
    });
  });
  
  app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading file');
      }
  
      const notes = JSON.parse(data);
      const newNote = {
        id: notes.length + 1,
        ...req.body
      };
      notes.push(newNote);
  
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error writing file');
        }
        res.json(newNote);
      });
    });
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);