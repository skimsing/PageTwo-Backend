const router = require("express").Router();
const {verifyUser} = require('../auth');

const {
 getAllUsers,
 getUserProfile,
 getSingleUser
} = require('../controllers/userLoginController');

router.route("/")
    .get(verifyUser, getAllUsers)
    .post();

router.route("/:userid")
    .get(verifyUser, getSingleUser)
    .put()


module.exports = router;