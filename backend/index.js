const connectMongo = require('./db');
const express = require('express');

connectMongo();
const app = express();
const port = 3000;

// Available routes
app.use('api/auth', require('./routes/auth.js'));
app.use('api/notes', require('./routes/notes.js'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`iNoteBook backend listening at http://localhost:${port}`)
})
