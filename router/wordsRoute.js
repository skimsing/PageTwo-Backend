const router = require("express").Router();
const {verifyUser} = require('../auth');


//GET ALL CONTROLLERS
const {
    getAllWords,
    getSelectedWord,
    addWord,
    deleteWord
} = require("../controllers/wordsController");

router.route("/:userId")
.get(getAllWords)
.post(addWord);

// router.route("/:userId/add")


router.route("/:userId/:wordId")
.get(getSelectedWord)
.delete(deleteWord);

module.exports = router;