const router = require("express").Router();

//GET ALL CONTROLLERS
const {
    getAllScores,
    postScore,
    getUserScore,
    getAllUserScores,
    deleteUserScore
} = require("../controllers/scoresController")

//ROUTES
router.route("/")
.get(getAllScores) //working
.post(postScore);

//ALL GAMES BY USER ID
router.route("/:userId")
.get(getAllUserScores);

//SINGLE SCORES BY GAME ID
router.route("/:userId/:gameId")
.get(getUserScore)
.delete(deleteUserScore);

module.exports = router;