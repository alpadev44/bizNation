const { verifyToken } = require('../utils/jwt');

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    console.log(token)
    if (!token) {
        
        return res.status(401).send({ message: 'Unauthorized!' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).send({ message: 'Invalid token!' });
    }
}

module.exports = authenticateJWT;