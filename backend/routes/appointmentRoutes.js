const express = require('express');
const { 
    bookAppointment, 
    getAppointmentsByPatient, 
    getAppointmentsByDoctor, 
    cancelAppointment 
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to book an appointment
router.post('/book', authMiddleware, async (req, res) => {
    try {
        await bookAppointment(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while booking the appointment.' });
    }
});

// Route to get appointments by patient
router.get('/patient', authMiddleware, async (req, res) => {
    try {
        await getAppointmentsByPatient(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
    }
});

// Route to get appointments by doctor
router.get('/doctor', authMiddleware, async (req, res) => {
    try {
        await getAppointmentsByDoctor(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
    }
});

// Route to cancel an appointment
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await cancelAppointment(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while cancelling the appointment.' });
    }
});

module.exports = router;
