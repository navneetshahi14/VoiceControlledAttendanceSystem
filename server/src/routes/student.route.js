import express from 'express';
import {
  GetMyAttendanceForSession,
  GetMyAttendanceHistory,
  GetMyAttendancePercentage,
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/attendance/session', GetMyAttendanceForSession);
router.get('/attendance/history', GetMyAttendanceHistory);
router.get('/attendance/percentage', GetMyAttendancePercentage);

export default router;
