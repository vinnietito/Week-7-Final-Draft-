const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.registerPatient = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    await Patient.create({ first_name, last_name, email, password });
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findByEmail(email);
    if (!patient) return res.status(400).json({ message: 'Patient not found' });
    const match = await bcrypt.compare(password, patient.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
