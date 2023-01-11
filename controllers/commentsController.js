const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

//ADD COMMENT 
exports.postComment = (req, res) => {
    knex("comments")
    .insert({ postId: uuid4(), ...req.body })
    .then(() => {
        res.status(201).send("comment posted");
    });
}
//GET ALL COMMENTS
exports.getAllComments = (req, res) =>{
    knex("comments")
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(400).send(`Error retrieving comments: ${err}`)
    );
}

//GET SINGLE USER COMMENT
exports.getUserComment = (req, res) => {
    knex("comments")
    .where("commentid",req.params.postId)
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(400).send(`Error retrieving comment: ${err}`)
    );
}
//EDIT COMMENT
exports.editUserComment = (req, res) => {
    knex("comments")
    .where("commentid",req.params.postId)
    .update(req.body)
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
      res.status(500).send(`Error updating comment: ${err}`)
    );

}
//DELETE SINGLE COMMENT
exports.deleteUserComment = (req, res) => {
    knex("comments")
    .where("commentid", req.params.postId)
    .del()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(500).send(`Error deleting comment: ${err}`)
    );
}