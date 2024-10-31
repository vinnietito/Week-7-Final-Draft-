// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust the path to your database connection
const bcrypt = require('bcrypt'); // For hashing passwords

// Signup route
router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

    try {
        // Hash the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into MySQL database
        const sql = `
            INSERT INTO patients (first_name, last_name, email, password, phone, date_of_birth, gender, address, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        db.query(sql, [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address], (error, results) => {
            if (error) {
                console.error("Database insert error:", error);
                return res.status(500).json({ message: "Failed to register user" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM patients WHERE email = ?`;
    db.query(sql, [email], async (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ message: "Login failed" });
        }
        
        if (results.length > 0) {
            const user = results[0];
            // Compare entered password with stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                return res.status(200).json({ message: 'Login successful!', token: 'mock-token' });
            }
        }
        res.status(401).json({ message: 'Invalid credentials' });
    });
});

module.exports = router;
