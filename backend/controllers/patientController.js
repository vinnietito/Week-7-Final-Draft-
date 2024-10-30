const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register a new patient
exports.registerPatient = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new patient
    await Patient.create({ 
      first_name, 
      last_name, 
      email, 
      password: hashedPassword, 
      phone, 
      date_of_birth, 
      gender, 
      address 
    });

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Login a patient
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Retrieve patient by email
    const patient = await Patient.findByEmail(email);
    
    console.log('Logging in patient:', { email, password });
    
    // Check if patient exists
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    console.log('Retrieved patient:', patient);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, patient.password);
    console.log('Stored password:', patient.password);
    console.log('Does password match?', isMatch);

    // If passwords do not match
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Other methods like updatePatientProfile and deletePatient would go here
// Update a patient's profile
exports.updatePatientProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, phone, date_of_birth, gender, address } = req.body;
    
    await Patient.update(id, { 
      first_name, 
      last_name, 
      phone, 
      date_of_birth, 
      gender, 
      address 
    });
    
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