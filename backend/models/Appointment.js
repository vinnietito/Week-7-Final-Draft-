const db = require('../config/db');

class Appointment {
  static async create(data) {
    const query = 'INSERT INTO appointments (patient_id, doctor_id, date, time) VALUES (?, ?, ?, ?)';
    return db.promise().query(query, [data.patient_id, data.doctor_id, data.date, data.time]);
  }
}

module.exports = Appointment;
