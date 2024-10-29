const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register a new patient
exports.registerPatient = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Patient.create({ first_name, last_name, email, password: hashedPassword });
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a patient
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findByEmail(email);
    if (!patient) return res.status(400).json({ message: 'Patient not found' });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a patient's profile
exports.updatePatientProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, phone } = req.body;
    await Patient.updateProfile(id, { first_name, last_name, phone });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a patient account
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.user;
    await Patient.delete(id);
    res.json({ message: 'Patient account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
