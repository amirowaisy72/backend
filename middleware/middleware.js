var jwt = require('jsonwebtoken');


const JWT_SECRET = 'Amirisagoodboy';

const middleware = (req, res, next)=>{
    let success = false
    //Get the user from JWT Token and add it to the req object
    const token = req.header('auth-token');
    if(!token){
        res.send({success, reason:"Please authenticate using a valid token"});
    }else{
        try{
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();
        }catch (err){
            res.send({success, reason:"Please authenticate using a valid token"});
        }
    }
}

module.exports = middleware;