const db = require('../config/db');

class Patient {
  static async create(patientData) {
    const sql = `
      INSERT INTO patients (first_name, last_name, email, password, phone, date_of_birth, gender, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
    return await db.query(sql, [
      patientData.first_name,
      patientData.last_name,
      patientData.email,
      patientData.password,
      patientData.phone,
      patientData.date_of_birth,
      patientData.gender,
      patientData.address
    ]);
  }

  static async findByEmail(email) {
    const sql = `SELECT * FROM patients WHERE email = ?`;
    const result = await db.query(sql, [email]);
    return result[0]; // Return the first record found
  }

  // Other methods like update, delete would go here
}

module.exports = Patient;
