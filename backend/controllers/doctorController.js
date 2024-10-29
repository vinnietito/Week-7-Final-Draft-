const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register a new doctor
exports.registerDoctor = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, specialization } = req.body;

    // Check if the doctor already exists
    const existingDoctor = await Doctor.findByEmail(email);
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Doctor.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      specialization,
    });

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a doctor
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findByEmail(email);
    if (!doctor) return res.status(400).json({ message: 'Doctor not found' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a doctor's profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.user; // Assuming you're using a middleware to get the doctor's ID from the token
    const { first_name, last_name, phone, specialization } = req.body;

    await Doctor.update(id, { first_name, last_name, phone, specialization });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a doctor account
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.user; // Assuming you're using a middleware to get the doctor's ID from the token
    await Doctor.delete(id);
    res.json({ message: 'Doctor account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
