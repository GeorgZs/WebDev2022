const jwt = require(jsonwebtoken);

const verifyToken = async (req, res, err) => {
    const token = req.body.token || req.query.token //req.headers["x-access-token"];

    if(token) {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            req.provider = decoded;
        } catch (err) {
            return res.status(401).json({"message": "invalid token"})
        }
        return res.status(403).json({"message" : "A token is required for authentication"})
    }
    return err;
}

module.exports = verifyToken;