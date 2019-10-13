const mongoose = require('mongoose');

const StudentGroupSchema = mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

StudentGroupSchema.index({ studentId: 1, groupId: 1 }, { unique: true });

module.exports = mongoose.model('StudentGroup', StudentGroupSchema);