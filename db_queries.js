// // Example: Get user profile
// User.findById(user_id)
//   .then(user => res.json(user))
//   .catch(err => res.status(500).json({ message: 'Error fetching user', error: err }));

// // Example: Get mood history for a user
// Mood.find({ user_id })
//   .sort({ timestamp: -1 })  // Sort by most recent first
//   .then(moods => res.json(moods))
//   .catch(err => res.status(500).json({ message: 'Error fetching moods', error: err }));

// // Example: Get conversations for a user
// Conversation.find({ user_id })
//   .sort({ timestamp: -1 })  // Sort by most recent first
//   .then(conversations => res.json(conversations))
//   .catch(err => res.status(500).json({ message: 'Error fetching conversations', error: err }));


// // Update Example
// Mood.findByIdAndUpdate(mood_id, { mood: 'happy', intensity: 8 }, { new: true })
// .then(updatedMood => res.json(updatedMood))
// .catch(err => res.status(500).json({ message: 'Error updating mood', error: err }));


// // Delete Example
// Mood.findByIdAndDelete(mood_id)
//   .then(() => res.json({ message: 'Mood entry deleted successfully' }))
//   .catch(err => res.status(500).json({ message: 'Error deleting mood', error: err }));

