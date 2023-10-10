// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile('/notes.html'); 
  });
  
  app.get('*', (req, res) => {
    res.sendFile('/index.html');
  });
  
  // API routes
  const { v4: uuidv4 } = require('uuid'); 
  
  let notes = [];
  
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });
  
  app.post('/api/notes', (req, res) => {
    const newNote = {
      id: uuidv4(),
      ...req.body
    };
  
    notes.push(newNote);
  
    res.json(newNote);
  });
  