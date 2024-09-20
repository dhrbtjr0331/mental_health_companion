const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Mood = require('../models/Mood');

// Mood Logging
router.post('/mood', verifyToken, async (req, res) => {
    const { happiness, sadness, anger, tiredness, notes } = req.body;

    try {

        console.log(req.user);
        
        // Access the user info from req.user (extracted from the JWT)
        const user_id = req.user.id;  // Assuming the token contains the user's id
        
        // Proceed with saving the mood data
        const newMoodLog = new Mood({
            user_id,  // Store the user ID from the JWT
            happiness,
            sadness,
            anger,
            tiredness,
            notes,
            timestamp: Date.now()
        });

        await newMoodLog.save()

        res.status(201).json({ message: 'Mood logged successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging mood', error });
    }
});

module.exports = router;