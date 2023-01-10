const router = require("express").Router();
const {verify, verifyAdmin} = require('../auth');

const {
 getAllUsers,
 getUserProfile,
 getSingleUser
} = require('../controllers/userLoginController');

router.route("/")
    .get(verify, verifyAdmin, getAllUsers)
    .post();

router.route("/:userid")
    .get(verify, getSingleUser)
    .put()


module.exports = router;