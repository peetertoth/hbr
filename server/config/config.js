// Environment variables
const {
    PORT = 8000,
    MONGODB_URL = 'localhost',
    MONGODB_USR = 'hbr',
    MONGODB_PWD = 'hbr',
    MONGODB_PRT = 27017,
    MONGODB_DBN = 'hbr',
    SESS_SECRET = 'secret key',
    CORS = 'http://192.168.0.143:8080,http://178.48.83.132:8080',
    NODE_ENV = 'dev',
} = process.env;

module.exports = {
    ENV: {
        PORT,
        MONGODB_URL,
        MONGODB_USR,
        MONGODB_PWD,
        MONGODB_PRT,
        MONGODB_DBN,
        SESS_SECRET,
        CORS,
        NODE_ENV,
    }
};