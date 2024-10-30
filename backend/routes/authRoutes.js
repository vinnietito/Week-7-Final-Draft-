// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Mock database or import your actual User model
const users = [];

// Signup route
router.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;

    // Add user to "database" (this is just a mock example)
    users.push({ name, email, phone, password });
    res.status(201).json({ message: 'User registered successfully!' });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple check (use a real database lookup in production)
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful!', token: 'mock-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
