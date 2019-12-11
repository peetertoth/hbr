const mongoose = require('mongoose');

const VisitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  groupId: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Visit', VisitSchema);