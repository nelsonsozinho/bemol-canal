const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports = async(req, res, next) => {
    const path = req.route.path;
    const authHeader = req.headers.authorization;

    //ignore authentication and signin path
    if(path === '/user/authentication' || path === "/user") {
        return next();
    }
    
    if(!authHeader) {
        return res.status(401).send({error: 'No token provided'});
    }

    const [scheme, token] = authHeader.split(" ");
    
    if(scheme !== 'Bearer') {
        return res.status(401).send({auth: false, error: 'Invalid token', description: "'Bearer' token compose not found !"});
    }

    jwt.verify(token, "secret", function (err, decoded) {
        if(err) return res.status(401).send({auth: false, error: 'Invalid token'});
        return next();
    });

}