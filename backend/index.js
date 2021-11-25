const connectMongo = require('./db');
const express = require('express');

connectMongo();
const app = express();
const port = 5000;

// to use req.body in our application 
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.listen(port, () => {
    console.log(`iNoteBook backend listening at http://localhost:${port}`);
});
