const express = require('express');
const { registerDoctor, loginDoctor, updateDoctorProfile, deleteDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);
router.put('/profile', authMiddleware, updateDoctorProfile);
router.delete('/delete', authMiddleware, deleteDoctor);

module.exports = router;
