const mongoose = require("mongoose");

const AttendanceSessionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  AttendanceSessionSchema
);

module.exports = AttendanceSession;
