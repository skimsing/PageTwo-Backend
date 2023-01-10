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
router.route("/comment")
.get(getAllComments)
.post(postComment);

//GET COMMENT BY ID
router.route("/comment/:commentid")
.get(getUserComment)
.put(editUserComment)
.delete(deleteUserComment);

module.exports = router;