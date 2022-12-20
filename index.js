const { application } = require('express');
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile'));
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const app = express();
app.use(express.json());
const {v4: uuid4} = require("uuid"); 

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


