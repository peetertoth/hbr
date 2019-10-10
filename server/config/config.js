// Environment variables
const {
    SRV_PORT = 8000,
    MONGODB_URL = 'mongodb://localhost/hbr',
    SESS_SECRET = 'secret key'
} = process.env;

module.exports = {
    ENV: {
        SRV_PORT,
        MONGODB_URL,
        SESS_SECRET,
    }
};