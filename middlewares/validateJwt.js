const {response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req, res = response, next)=>{
    const token = req.headers['x-access-token']  
    
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        return res.status(401).json({
            auth: false,
            message: 'Invalid token'
        });
    }
    
    next();

}
module.exports = {
    validateJwt
}