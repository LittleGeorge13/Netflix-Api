const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const authHeader = req.headers.token;
    let token = "";
    if (authHeader) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.PASSWORD_ENCRYPT, (err, user) => {
            if (err) return res.status(403).json('Token is not valid!');
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}