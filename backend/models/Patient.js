const db = require('../config/db');
const bcrypt = require('bcrypt');

class Patient {
  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const query = 'INSERT INTO patients (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    return db.promise().query(query, [data.first_name, data.last_name, data.email, hashedPassword]);
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM patients WHERE email = ?';
    const [result] = await db.promise().query(query, [email]);
    return result[0];
  }
}

module.exports = Patient;
