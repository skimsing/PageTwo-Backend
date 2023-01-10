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
router.route("/game")
.get(getAllScores)
.post(postScore);

//ALL GAMES BY USER ID
router.route("/game/:userid")
.get(getAllUserScores);

//SINGLE SCORES BY GAME ID
router.route("/game/:userid/:gameid")
.get(getUserScore)
.delete(deleteUserScore);

module.exports = router;