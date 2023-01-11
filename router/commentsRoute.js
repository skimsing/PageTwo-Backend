const router = require("express").Router();
//GET CONTROLLERS
const {
    postComment,
    getAllComments,
    getUserComment,
    editUserComment,
    deleteUserComment
} = require("../controllers/commentsController")

//GET ALL COMMENTS
router.route("/")
.get(getAllComments) //working
.post(postComment);

//GET COMMENT BY ID
router.route(":commentId")
.get(getUserComment)
.put(editUserComment)
.delete(deleteUserComment);

module.exports = router;