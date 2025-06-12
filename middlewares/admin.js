export default function admin(req, res, next) {
    console.log("User Role:", req.user.role); // Debugging line to check user role
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next(); // Call the next middleware or route handler
}