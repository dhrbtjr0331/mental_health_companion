const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Conversation = require('../models/Conversation');
const axios = require('axios');

// Chat with AI
router.post('/chat', verifyToken, async (req, res) => {
    // Placeholder logic for AI chat
    const { messages, overall_sentiment, advice_given } = req.body;

    try {
        // Access the user_id from req.user (extracted from the JWT)
        const user_id = req.user.id;

        // Analyze sentiment for each message
        for (let message of messages) {
            const response = await axios.post('http://localhost:5000/analyze', {
                message: message.content
            });

            message.sentiment_score = response.data.compound;
        }
        // Create a new conversation document
        const newConversation = new Conversation({
            user_id,
            messages,
            overall_sentiment,
            advice_given
        });

        await newConversation.save();

        res.status(201).json({ message: 'Conversation logged successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging conversation', error });
    }
});

module.exports = router;