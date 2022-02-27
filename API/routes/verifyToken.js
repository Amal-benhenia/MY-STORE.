const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req,res,next)=>{
 const token = req.headers["x-auth-token"];
if ( token) {
    jwt.verify(token, process.env.SECRET_PASS, (err,user) => {
    if (err) res.status(403).json('token is not valid');
    req.user = user;
    next();
    })
} else {
    return res.status(401).json('you are not authenticated')
}
}    
const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, async()=>{
        const token = req.headers["x-auth-token"];
        const decodedToken = await jwt.verify(token, process.env.SECRET_PASS);
        const id = decodedToken.userId;
        const user = await User.findById(id);
        if( user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json('you are not allowed to do that!')
        }
    })
}

const verifyTokenAndAdmin =  (req, res, next)=>{
    verifyToken(req,res, async()=>{
        const token = req.headers["x-auth-token"];
        const decodedToken = await jwt.verify(token, process.env.SECRET_PASS);
        const id = decodedToken.userId;
        const user = await User.findById(id);
        if(user.isAdmin) {
           next()
        } else {
            res.status(403).json('only admin can do that!')
        }
    })
}
module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};