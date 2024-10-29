const express = require('express');
const { bookAppointment, getAppointmentsByPatient, getAppointmentsByDoctor, cancelAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authMiddleware, bookAppointment);
router.get('/patient', authMiddleware, getAppointmentsByPatient);
router.get('/doctor', authMiddleware, getAppointmentsByDoctor);
router.delete('/:id', authMiddleware, cancelAppointment);

module.exports = router;
