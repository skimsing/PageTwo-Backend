const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

//GET ALL SCORES
exports.getAllScores = (req, res) => {
    knex("scores")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving scores: ${err}`)
    );
}

//POST SINGLE SCORE
exports.postScore = (req, res) => {
    knex("scores")
    .insert({ id: uuid4(), ...req.body })
    .then(() => {
        res.status(201).send("scores posted");
    })
    .catch((err) =>
        res.status(400).send(`Error posting score: ${err}`)
    );
}

//// <-----> HANDLE LOGGED IN USER SCORES <-----> ////
//GET ALL USER SCORES
exports.getAllUserScores = (req, res) => {
    knex("scores")
    .where("userid", req.params.userid)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving user scores: ${err}`)
    );
}

//GET SINGLE USER SCORE
exports.getUserScore = (req, res) => {
    knex("scores")
    .where("userid", req.params.userid)
    .andWhere("gameid", req.params.gameid)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user score: ${err}`)
    );
}
//DELETE SINGLE SCORE
exports.deleteUserScore = (req, res) => {
    knex("scores")
    .where("userid", req.params.userid)
    .andWhere("gameid", req.params.gameid)
    .del()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting score: ${err}`)
    );
}
