import express from 'express';
import { EndMarkAttendance, GetAttendance, StartMarkAttendance } from '../controllers/teacher.controller';

const router = express.Router();



router.post('/startMarking',StartMarkAttendance);
router.post('/endMarking',EndMarkAttendance);
router.get('/getAttendance', GetAttendance);


export default router;