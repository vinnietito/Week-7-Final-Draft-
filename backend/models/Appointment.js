const db = require('../config/db');

class Appointment {
    static async create(data) {
        const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)';
        return db.promise().query(query, [data.patient_id, data.doctor_id, data.appointment_date, data.status || 'Pending']);
    }

    static async findById(id) {
        const query = 'SELECT * FROM appointments WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0]; // Return the first matching row
    }

    static async update(id, data) {
        const query = 'UPDATE appointments SET appointment_date = ?, status = ? WHERE id = ?';
        return db.promise().query(query, [data.appointment_date, data.status, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM appointments WHERE id = ?';
        return db.promise().query(query, [id]);
    }

    static async findByPatientId(patient_id) {
        const query = 'SELECT * FROM appointments WHERE patient_id = ?';
        const [rows] = await db.promise().query(query, [patient_id]);
        return rows; // Return all appointments for the patient
    }

    static async findByDoctorId(doctor_id) {
        const query = 'SELECT * FROM appointments WHERE doctor_id = ?';
        const [rows] = await db.promise().query(query, [doctor_id]);
        return rows; // Return all appointments for the doctor
    }
}

module.exports = Appointment;
