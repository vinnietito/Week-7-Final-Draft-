const db = require('../config/db');

class Doctor {
    static async create(data) {
        const query = 'INSERT INTO doctors (name, specialization, availability, phone) VALUES (?, ?, ?, ?)';
        return db.promise().query(query, [data.name, data.specialization, data.availability, data.phone]);
    }

    static async findAll() {
        const query = 'SELECT * FROM doctors';
        const [rows] = await db.promise().query(query);
        return rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM doctors WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0]; // Return the first matching row
    }

    static async update(id, data) {
        const query = 'UPDATE doctors SET name = ?, specialization = ?, availability = ?, phone = ? WHERE id = ?';
        return db.promise().query(query, [data.name, data.specialization, data.availability, data.phone, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM doctors WHERE id = ?';
        return db.promise().query(query, [id]);
    }
}

module.exports = Doctor;
