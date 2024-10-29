const db = require('../config/db');
const bcrypt = require('bcrypt');

class Doctor {
    static async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const query = 'INSERT INTO doctors (first_name, last_name, email, password, specialization, phone) VALUES (?, ?, ?, ?, ?, ?)';
        return db.promise().query(query, [data.first_name, data.last_name, data.email, hashedPassword, data.specialization, data.phone]);
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM doctors WHERE email = ?';
        const [rows] = await db.promise().query(query, [email]);
        return rows[0]; // Return the first matching row
    }

    static async findById(id) {
        const query = 'SELECT * FROM doctors WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0]; // Return the first matching row
    }

    static async update(id, data) {
        const query = 'UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, phone = ? WHERE id = ?';
        return db.promise().query(query, [data.first_name, data.last_name, data.specialization, data.phone, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM doctors WHERE id = ?';
        return db.promise().query(query, [id]);
    }
}

module.exports = Doctor;
