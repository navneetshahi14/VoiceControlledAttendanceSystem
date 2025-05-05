import user from '../models/user.model.js';
import AttendanceSession from '../models/AttendanceSession.js';
import Attendance from '../models/Attendance.js';


export const StartMarkAttendance = async (req, res) => {
    try{

        const { subject, startTime, endDate } = req.body;
        const teacherId = req.user._id;

        // Check if the teacher is already marking attendance
        const existingSession = await AttendanceSession.findOne({ teacher: teacherId, isActive: true });
        if (existingSession) {
            return res.status(400).json({ message: "You are already marking attendance." });
        }

        // Create a new attendance session
        const newSession = new AttendanceSession({
            subject,
            teacher: teacherId,
            startTime,
            endDate,
            isActive: true,
        });

        await newSession.save();
        res.status(201).json({ message: "Attendance session started successfully." ,sessionId: newSession._id });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

export const EndMarkAttendance = async (req, res) => {
    try{
        const { sessionId } = req.body;

        // Find the attendance session by ID
        const session = await AttendanceSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Attendance session not found." });
        }

        // Check if the session is already ended
        if (!session.isActive) {
            return res.status(400).json({ message: "Attendance session is already ended." });
        }

        // Mark the session as inactive
        session.isActive = false;
        await session.save();

        res.status(200).json({ message: "Attendance session ended successfully." });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}


export const GetAttendance = async (req, res) => {
    try{
        const { sessionId } = req.body;

        // Find the attendance session by ID
        const session = await AttendanceSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Attendance session not found." });
        }

        // Fetch the attendance records for the session
        const attendanceRecords = await Attendance.find({ session: sessionId }).populate('student', 'name email');

        res.status(200).json({ attendanceRecords });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}