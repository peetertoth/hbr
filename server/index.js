// **Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
// Import**

// Environment variables
const {
    SRV_PORT = 8000,
    MONGODB_URL = 'mongodb://localhost/hbr',
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
console.info(`Initialize mongodb connection to ${MONGODB_URL} ...`);
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(cookieParser());

// **Endpoints

app.get('/', (req, res) => {
    console.log('Homepage open');
    res.send('<h1>Hello World!</h1>');
});

const student = require('./api/StudentController');
app.use('/api/student', student);

const group = require('./api/GroupController');
app.use('/api/group', group);

const auth = require('./api/UserController');
app.use('/api/user', auth);

// Endpoints**


app.listen(SRV_PORT, () => {
    console.log(`Server listening on port ${SRV_PORT}`);
});