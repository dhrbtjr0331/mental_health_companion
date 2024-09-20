require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const moodRoutes = require('./routes/mood');


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


// Middleware to parse JSON request bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Based Mental Health Companion');
});

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mood', moodRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});