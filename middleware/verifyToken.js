const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    // Get token from header
    const token = req.header('auth-token');

    // Return error if no token was found
    if(!token) return res.status(401).send('Access Denied');

    // Verify token
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;

        next();
    } catch(error) {
        res.status(400).send("Invalid token");
    }

}