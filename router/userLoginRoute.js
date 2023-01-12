const router = require("express").Router();
const {verifyUser} = require('../auth');

const {
 getAllUsers,
 getUserProfile,
 getSingleUser,
 registerUser,
 loginUser
} = require('../controllers/userLoginController');

router.route("/")
    .get(getAllUsers)
    .post(loginUser);

router.route("/create")
    .post(registerUser);

router.route("/:userid")
    .get(getSingleUser);    


module.exports = router;