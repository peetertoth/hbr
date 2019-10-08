// **Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
// Import**

// Environment variables
const {
    SRV_PORT = 8000,
    SESS_SECRET = 'secret key'
} = process.env;

// Server instance
const app = express();

// Session config
app.use(expressSession({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        sameSite: true,
        secure: false // set true on production
    }
}));

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


app.listen(SRV_PORT, () => {
    console.log(`Server listening on port ${SRV_PORT}`);
});