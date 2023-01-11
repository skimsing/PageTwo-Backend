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

//JWT VERIFICATION
function createUser(req, res, next) {
    const data = {
        id: user.userid,
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

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.get(('/game'),(req,res) =>{
    knex("scores")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving scores: ${err}`)
    );

});

app.post(("/game"),(req,res)=>{
    knex("scores")
    .insert({ id: uuid4(), ...req.body })
    .then(() => {
        res.status(201).send("scores posted");
    })
    .catch((err) =>
        res.status(400).send(`Error posting scores: ${err}`)
    );
});

//get all comments
app.get(('/comment'),(req,res) =>{
    knex("comments")
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(400).send(`Error retrieving comments: ${err}`)
    );
});

//post new comment
app.post(('/comment'),(req,res)=>{
    knex("comments")
    .insert({ id: uuid4(), ...req.body })
    .then(() => {
        res.status(201).send("comment posted");
    });
});

//get comment by ID
app.get(('/comment/:id'), (req, res) =>{
    knex("comments")
    .where("id",req.params.id)
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(400).send(`Error retrieving comments: ${err}`)
    );
})

//delete comment by id
app.delete(('/comment/:id'),(req, res) => {
    knex("comments")
    .where("id", req.params.id)
    .del()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error deleting comments: ${err}`)
    );
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


