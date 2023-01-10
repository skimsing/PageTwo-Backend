require("dotenv").config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//for registered users
module.exports.createAccessToken = user =>{
    const data = {
        userid: user.userid,
        email: user.email,
        type: user.type
    }
    return jwt.sign(data, JWT_SECRET, {})
}

//verify users
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

//verify user type
module.exports.verifyType = (req, res, next) => {
    if(req.user.type === "ADMIN"){
        next();
    }
    else{
        res.status(400).send({auth: "Failed", message: "Acess Forbidden"});
    }
}