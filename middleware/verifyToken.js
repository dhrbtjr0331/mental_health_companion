const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


// Middleware for protecting routes
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if user has token
    if (!token) {
        return res.status(401).json({ message: 'Access denied. User has no token.' });
    }

    try {
        // Verify token
        const verified = jwt.verify(token.split(' ')[1], JWT_SECRET_KEY); 
        req.user = verified; // Attach verification to the user's request object
        next(); // Pass control to the next middleware
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;