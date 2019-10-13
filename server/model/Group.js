const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    studentsCount: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Group', GroupSchema);