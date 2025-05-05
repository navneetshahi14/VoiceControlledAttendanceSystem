const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Types.ObjectId,
      ref: "AttendanceSession",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["present", "absent"],
      default: "present",
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.export = Attendance;
