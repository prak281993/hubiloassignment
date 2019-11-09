const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(400).json({ message: 'No Token, user not authorized' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}