const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date } = req.body;

    // Create a new appointment
    await Appointment.create({ patient_id, doctor_id, appointment_date });
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments for a specific patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const { id } = req.user; // Assuming the patient's ID is available in the token
    const appointments = await Appointment.findByPatientId(id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments for a specific doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.user; // Assuming the doctor's ID is available in the token
    const appointments = await Appointment.findByDoctorId(id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update the status of an appointment
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // Appointment ID from the URL
    const { status } = req.body;

    await Appointment.updateStatus(id, status);
    res.json({ message: 'Appointment status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params; // Appointment ID from the URL
    await Appointment.delete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
