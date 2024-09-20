const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moodSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    happiness: { type: Number, required: true }, // E.g. Scale from 1 to 10
    sadness: { type: Number, required: true }, // E.g. Scale from 1 to 10
    anger: { type: Number, required: true }, // E.g. Scale from 1 to 10
    tiredness: { type: Number, required: true},
    notes: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood', moodSchema);