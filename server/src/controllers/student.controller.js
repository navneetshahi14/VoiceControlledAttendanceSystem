import Attendance from '../models/Attendance.js';
import AttendanceSession from '../models/AttendanceSession.js';
import User from '../models/user.model.js'; // Student model

// Get student's attendance for a specific session
export const GetMyAttendanceForSession = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { sessionId } = req.body;

    const session = await AttendanceSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Attendance session not found." });
    }

    const record = await Attendance.findOne({ session: sessionId, student: studentId });

    if (!record) {
      return res.status(404).json({ message: "No attendance marked for this session." });
    }

    res.status(200).json({ attendance: record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get full attendance history for a student
export const GetMyAttendanceHistory = async (req, res) => {
  try {
    const studentId = req.user._id;

    const records = await Attendance.find({ student: studentId })
      .populate('session', 'subject startTime endDate')
      .sort({ createdAt: -1 });

    res.status(200).json({ attendanceHistory: records });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get attendance percentage for the student
export const GetMyAttendancePercentage = async (req, res) => {
  try {
    const studentId = req.user._id;

    const total = await Attendance.countDocuments({ student: studentId });
    const present = await Attendance.countDocuments({ student: studentId, status: 'present' });

    const percentage = total === 0 ? 0 : (present / total) * 100;

    res.status(200).json({
      totalSessions: total,
      presentSessions: present,
      percentage: percentage.toFixed(2) + '%'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

