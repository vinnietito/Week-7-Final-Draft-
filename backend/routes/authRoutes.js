const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust the path to your database connection
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'qwertyuiopoiuytrewqwertyuiop'; // Make sure to set a JWT_SECRET in your .env file

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
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: "User with this email already exists." });
                }
                return res.status(500).json({ message: "Failed to register user due to a server error." });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "An error occurred during registration. Please try again later." });
    }
});


// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email);  // Log the email being used to log in

    const sql = `SELECT * FROM patients WHERE email = ?`;
    db.query(sql, [email], async (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ message: "Login failed. Please try again." });
        }
        
        console.log("Results:", results);  // Log the results from the database query

        if (results.length > 0) {
            const user = results[0];
            // Compare entered password with stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            console.log("Password match:", isPasswordMatch);  // Log password comparison result

            if (isPasswordMatch) {
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                console.log("JWT Token generated:", token);  // Log the generated JWT token
                return res.status(200).json({ message: 'Login successful!', token: token });
            }
        }
        res.status(401).json({ message: 'Invalid credentials' });
    });
});


module.exports = router;
