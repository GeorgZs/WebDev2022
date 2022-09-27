const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token //req.headers["x-access-token"];
    // best to use Authorization header with bearer token

    if (!token) {
        return res.status(401).json({ "message": "invalid credentials" })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.auth = decoded;
    } catch (err) {
        return res.status(401).json({ "message": "invalid credentials" })
    }

    // valid token, thus continue
    next();
}

module.exports = verifyToken;
