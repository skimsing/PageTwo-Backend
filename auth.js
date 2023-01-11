require("dotenv").config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//create users
// module.exports.createUser = 


//for registered users
module.exports.createAccessToken = user =>{
    const data = {
        userid: user.userid,
        email: user.email,
    }
    return jwt.sign(data, JWT_SECRET, {})
}

//verify users middleware
module.exports.verifyUser = (req, res, next) =>{
    req.headers.authorization.split(' ')[1];

    if(token && jwt.verify(token, JWT_SECRET)){
        req.user = jwt.decode(token);
        next();
    }
    else{
        next();
    }
}
