require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import the User model

// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// User Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;  // Ensure is included

    try {
        // Validate the input fields
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPW = await bcrypt.hash(password, 10);

        // Create a new user using the User model
        const newUser = new User({
            username,
            password: hashedPW,
        });

        // Save the user in MongoDB
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

module.exports = router;


router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // Find username & check if it exists
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Username does not exist" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    // Create and sign a JWT
    const token = jwt.sign({
        id: user._id,   // Include the user's _id in the payload
        username: user.username  // You can include other fields as needed
        },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }  // Token expiration time
    );

    res.json({ message: 'Login successful', token});
});

module.exports = router;