const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        neptun: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Student', StudentSchema);