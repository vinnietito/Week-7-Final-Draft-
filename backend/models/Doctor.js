const db = require('../config/db');

class Doctor {
  static async create(data) {
    const query = 'INSERT INTO doctors (name, specialization) VALUES (?, ?)';
    return db.promise().query(query, [data.name, data.specialization]);
  }
}

module.exports = Doctor;
