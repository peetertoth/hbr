// **Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Import**

// Server instance
const app = express();

// Middleware for express server
app.use(bodyParser.json());

// Init mongodb connection
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/hbr';
console.info(`Initialize mongodb connection to ${mongodbUrl} ...`);
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// **Endpoints

app.get('/', (req, res) => {
    console.log('Homepage open');
    res.send('<h1>Hello World!</h1>');
});

const student = require('./api/StudentController');
app.use('/api/student', student);

const group = require('./api/GroupController');
app.use('/api/group', group);

// Endpoints**

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});