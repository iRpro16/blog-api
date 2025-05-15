const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = decoded.user; // attach decoded user info
            next();
        });
    } else {
        // Forbidden
        res.status(403).json({ message: "No token provided" });
    }
}

module.exports = verifyToken;