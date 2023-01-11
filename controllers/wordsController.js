const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

//GET ALL SAVED WORDS
exports.getAllWords = (req, res) => {
    knex("wordlist")
    .where("userId", req.params.userId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send("Error getting wordlist")
    );

}

//GET SELECTED WORD
exports.getSelectedWord = (req, res) => {
    knex("wordlist")
    .where("userId", req.params.userId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send("couldn't get selected word")
    );
}

//ADD WORD 
//whereExists( userID  && !word) 

exports.addWord = (req, res) => {
    knex("wordlist")
    .where("userId", req.params.userId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send("word already exists in list")
    );
}

//DELETE WORD
exports.deleteWord = (req, res) => {
    knex("wordlist")
    .where("wordId", req.params.wordId)
    .del()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error deleting word: ${err}`)
    );
}


