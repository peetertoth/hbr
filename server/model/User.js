const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    }
});

module.exports = mongoose.model('User', UserSchema);