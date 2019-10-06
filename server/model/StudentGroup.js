const mongoose = require('mongoose');

const StudentGroupSchema = mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true,
        },
        groupId: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('StudentGroup', StudentGroupSchema);