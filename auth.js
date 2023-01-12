require("dotenv").config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//generate access token
const createAccessToken = (user) =>{
    const data = {
        username: user.username
    }
    return jwt.sign(data, JWT_SECRET)
}

//authenticate user
const verifyUser = (req, res, next) =>{
    // authHeader = req.headers['authorization']
    const token = req.headers.authorization.split(' ')[1];

    if(token && jwt.verify(token, JWT_SECRET)){
        req.user = jwt.decode(token);
        next();
    }
    else{
        next();
        // res.status(403).send("Invalid token",err);
    }

}

//From Louise
// module.exports.createAccessToken = (user) =>{
//     // const data = {
//     //     username: user.username
//     // }
//     return jwt.sign(user, JWT_SECRET)
// }

// module.exports.verifyUser = (req, res, next) =>{
//     req.headers.authorization.split(' ')[1];

//     if(token && jwt.verify(token, JWT_SECRET)){
//         req.user = jwt.decode(token);
//         next();
//     }
//     else{
//         next();
//     }
// }

