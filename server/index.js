// **Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const morgan = require('morgan');
const path = require('path');

const config = require('./config/config');
// Import**

// Server instance
const app = express();

console.info(`Application runinng in ${config.ENV.NODE_ENV} mode`);

// Init mongodb connection
console.info(`Initialize mongodb connection to ${config.ENV.MONGODB_URL} ...`);
const mongodbConnect = `mongodb://${config.ENV.MONGODB_URL}:${config.ENV.MONGODB_PRT}/${config.ENV.MONGODB_DBN}`;
mongoose.connect(mongodbConnect, {
    user: config.ENV.MONGODB_USR,
    pass: config.ENV.MONGODB_PWD,
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
        sameSite: false,
        secure: false // set true on production
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Middleware for express server
app.use(bodyParser.json());

app.use(morgan('dev'));

// Enable cors in development
if (config.ENV.NODE_ENV === 'dev') {
    const cors = require('cors');
    const corsOrigins = [
        'http://localhost:8080',
        'http://192.168.0.143:8080',
        'http://178.48.83.132:8080',
    ];

    app.use(cors({
        origin: function(origin, cb) {
            if (corsOrigins.indexOf(origin) !== -1 || !origin) {
                // console.log('allowed', origin);
                if (!origin) {
                    console.log('no origin');
                }
                cb(null, true);
            } else {
                console.log('NOT allowed', origin);
                cb(new Error('Origin not allowed by CORS'));
            }
        },
        credentials: true,
    }));
}

// **Endpoints
app.use(express.static(path.resolve(__dirname, '../client/dist/')));

const student = require('./api/StudentController');
app.use('/api/student', student);

const group = require('./api/GroupController');
app.use('/api/group', group);

const auth = require('./api/UserController');
app.use('/api/user', auth);

const visit = require('./api/VisitController');
app.use('/api/visit', visit);

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "");
});

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Endpoints**

// Error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    const jsonResponse = {
        error: {
            message: err.message,
        },
    };

    const errorKeys = Object.keys(err);
    for (let i = 0; i < errorKeys.length; i++) {
        const key = errorKeys[i];
        jsonResponse.error[key] = err[key];
    }

    res.json(jsonResponse);
});


app.listen(config.ENV.PORT, () => {
    console.log(`Server listening on port ${config.ENV.PORT}`);
});