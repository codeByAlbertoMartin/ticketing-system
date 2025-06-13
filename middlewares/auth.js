import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
}