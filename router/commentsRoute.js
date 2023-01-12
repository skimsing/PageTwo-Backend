const router = require("express").Router();
const {verifyUser} = require('../auth');


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
router.route("/:postId")
.get(getUserComment)
.put(editUserComment)
.delete(deleteUserComment);

module.exports = router;