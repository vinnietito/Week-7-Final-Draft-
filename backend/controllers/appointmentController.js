const Appointment = require('../models/Appointment');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, date, time } = req.body;
    await Appointment.create({ patient_id, doctor_id, date, time });
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments by patient
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { patient_id } = req.user;
    const appointments = await Appointment.findByPatient(patient_id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments by doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.user;
    const appointments = await Appointment.findByDoctor(doctor_id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.cancel(id);
    res.json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
