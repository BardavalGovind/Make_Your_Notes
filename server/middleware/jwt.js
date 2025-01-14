const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    // Log the Authorization header to check if it's being sent correctly
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);  // Add this log
    const token = authHeader?.split(' ')[1];  // Assuming "Bearer <token>"
    console.log('Extracted Token:', token);  // Add this log

    if (!token) {
        return res.status(401).json({ error: true, message: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming JWT_SECRET is set
        req.user = decoded; // Attach decoded user data to `req.user`
        next();
    } catch (error) {
        return res.status(403).json({ error: true, message: "Invalid or expired token" });
    }
};

module.exports = AuthMiddleware;
