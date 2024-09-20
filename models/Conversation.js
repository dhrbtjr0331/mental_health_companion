const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: String, required: true },  // Either "user" or "ai"
  content: { type: String, required: true },
  sentiment_score: { type: Number, required: false },  // E.g., sentiment between -1 and 1
  timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema],  // Embedded array of messages
  overall_sentiment: { type: Number, required: false },  // Aggregate sentiment for the conversation
  advice_given: { 
    advice: { type: String },
    advice_effectiveness: { type: String },  // "positive", "neutral", "negative"
    timestamp: { type: Date, default: Date.now }
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);