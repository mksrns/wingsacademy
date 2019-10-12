const jwt = require('jsonwebtoken');
const config = require('../../config/database');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.adminSecret, null);
        req.adminData = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}