// **Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(expressSession);
const cors = require('cors');

const config = require('./config/config');
// Import**

// Server instance
const app = express();

// Init mongodb connection
console.info(`Initialize mongodb connection to ${config.ENV.MONGODB_URL} ...`);
mongoose.connect(config.ENV.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// Session config
app.use(expressSession({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: config.ENV.SESS_SECRET,
    cookie: {
        sameSite: true,
        secure: false // set true on production
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Middleware for express server
app.use(bodyParser.json());

app.use(cookieParser(config.ENV.SESS_SECRET));

const corsOrigins = [
    'http://localhost:8080',
    'http://192.168.0.143:8080',
];

app.use(cors({
    origin: function(origin, cb) {
        if (corsOrigins.indexOf(origin) !== -1) {
            console.log('allowed', origin);
            cb(null, true);
        } else {
            console.log('NOT allowed', origin);
            cb(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true,
}));

// **Endpoints

app.get('/', (req, res) => {
    const { session } = req;
    const { views } = session;
    session.views = views ? views + 1 : 1;

    if (session.user) {
        res.send(`<h1>Greetings ${ session.user.name }!</h1><p>Views: ${ session.views }</p>`);
    } else {
        res.send(`<h1>Hello World!</h1><p>Views: ${ session.views }</p>`);
    }
});

const student = require('./api/StudentController');
app.use('/api/student', student);

const group = require('./api/GroupController');
app.use('/api/group', group);

const auth = require('./api/UserController');
app.use('/api/user', auth);

// Endpoints**


app.listen(config.ENV.SRV_PORT, () => {
    console.log(`Server listening on port ${config.ENV.SRV_PORT}`);
});