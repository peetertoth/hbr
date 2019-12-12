// Environment variables
const {
    SRV_PORT = 8000,
    MONGODB_URL = 'localhost',
    MONGODB_USR = 'admin',
    MONGODB_PWD = 'admin',
    MONGODB_PRT = 27017,
    MONGODB_DBN = 'hbr',
    SESS_SECRET = 'secret key'
} = process.env;

module.exports = {
    ENV: {
        SRV_PORT,
        MONGODB_URL,
        MONGODB_USR,
        MONGODB_PWD,
        MONGODB_PRT,
        MONGODB_DBN,
        SESS_SECRET,
    }
};