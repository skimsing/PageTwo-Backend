const router = require("express").Router();

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

router.route("/:userId/:wordId")
.get(getSelectedWord)
.delete(deleteWord);

module.exports = router;