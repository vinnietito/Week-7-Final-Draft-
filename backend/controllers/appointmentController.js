const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date } = req.body;

        // Create the appointment in the database
        const newAppointment = await Appointment.create({
            patient_id,
            doctor_id,
            appointment_date,
            status: 'Scheduled' // Default status
        });

        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get appointments by patient ID
exports.getAppointmentsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        // Fetch appointments for the specific patient
        const appointments = await Appointment.findByPatientId(patient_id);
        
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this patient.' });
        }
        
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get appointments by doctor ID
exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctor_id } = req.params;

        // Fetch appointments for the specific doctor
        const appointments = await Appointment.findByDoctorId(doctor_id);
        
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this doctor.' });
        }
        
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the status of an appointment
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params; // Appointment ID from URL params
        const { status } = req.body; // New status from request body

        // Update the appointment status
        const updatedAppointment = await Appointment.updateStatus(id, status);
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.json({ message: 'Appointment status updated successfully', updatedAppointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params; // Appointment ID from URL params

        // Delete the appointment
        const deleted = await Appointment.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
