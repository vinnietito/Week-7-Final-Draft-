const db = require('../config/db');

class Patient {
  // Method to create a new patient
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

  // Method to find a patient by email
  static async findByEmail(email) {
    const sql = `SELECT * FROM patients WHERE email = ?`;
    const result = await db.query(sql, [email]);
    return result[0]; // Return the first record found
  }

  // Method to update a patient's profile
  static async update(id, updateData) {
    const sql = `
      UPDATE patients 
      SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? 
      WHERE id = ?`;
      
    return await db.query(sql, [
      updateData.first_name,
      updateData.last_name,
      updateData.phone,
      updateData.date_of_birth,
      updateData.gender,
      updateData.address,
      id
    ]);
  }

  // Method to delete a patient
  static async delete(id) {
    const sql = `DELETE FROM patients WHERE id = ?`;
    return await db.query(sql, [id]);
  }
}

module.exports = Patient;
