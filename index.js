const { application } = require('express');
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile'));
require('dotenv').config(); // load .env variables
// const PORT = process.env.PORT || 8080;
const jwt = require('jsonwebtoken');
const {v4: uuid4} = require("uuid"); 
const app = express();
app.use(express.json());
const { PORT, JWT_SECRET } = process.env;

//ROUTES
const commentsRoutes = require("./router/commentsRoute");
const scoresRoutes = require("./router/scoresRoute");
const wordBankRoutes = require("./router/wordsRoute");
const userLoginRoutes = require("./router/userLoginRoute");

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

//JWT VERIFICATION
function createUser(req, res, next) {
    const data = {
        userid: user.userid,
        username: user.username,
        password: user.password,
        email: user.email,
    }
    return jwt.sign(data,JWT_SECRET,{});
}   

//CHECK JWT TOKEN
function checkToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    // check and verify JWT token
    if (token && jwt.verify(token, JWT_SECRET)) {
      req.user = jwt.decode(token); // attach decoded token to req object
      next();
    } else {
      next();
    }
}

// //CHECK USER ROLE 
// function checkRole(req, res, next){
//     if(user.role === "admin"){

//     }
// }

app.use("/scores", scoresRoutes);
app.use("/comments", commentsRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


