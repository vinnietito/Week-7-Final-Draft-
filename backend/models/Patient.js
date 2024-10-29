const db = require('../config/db');
const bcrypt = require('bcrypt');

class Patient {
    static async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const query = 'INSERT INTO patients (first_name, last_name, email, password, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return db.promise().query(query, [data.first_name, data.last_name, data.email, hashedPassword, data.phone, data.date_of_birth, data.gender, data.address]);
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM patients WHERE email = ?';
        const [rows] = await db.promise().query(query, [email]);
        return rows[0]; // Return the first matching row
    }

    static async findById(id) {
        const query = 'SELECT * FROM patients WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0]; // Return the first matching row
    }

    static async update(id, data) {
        const query = 'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?';
        return db.promise().query(query, [data.first_name, data.last_name, data.phone, data.date_of_birth, data.gender, data.address, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM patients WHERE id = ?';
        return db.promise().query(query, [id]);
    }
}

module.exports = Patient;
