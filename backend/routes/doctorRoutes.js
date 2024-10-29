const express = require('express');
const { addDoctor, getAllDoctors, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addDoctor); // Restricted to admin
router.get('/', getAllDoctors);
router.put('/:id', authMiddleware, updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

module.exports = router;
