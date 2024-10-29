const express = require('express');
const { registerPatient, loginPatient, updatePatientProfile, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.put('/profile', authMiddleware, updatePatientProfile);
router.delete('/delete', authMiddleware, deletePatient);

module.exports = router;
