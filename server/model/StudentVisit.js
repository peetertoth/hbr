const mongoose = require('mongoose');

const StudentVisitSchema = mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    visitId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

StudentVisitSchema.index({ studentId: 1, visitId: 1 }, { unique: true });

module.exports = mongoose.model('StudentVisit', StudentVisitSchema);