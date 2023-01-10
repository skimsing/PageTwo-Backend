const router = require("express").Router();

//GET ALL CONTROLLERS
const {
    getAllWords,
    getSelectedWord,
    addWord,
    deleteWord
} = require("../controllers/wordsController");

router.route("/:userid/words")
.get(getAllWords)
.post(addWord);

router.route("/:userid/words/:wordid")
.get(getSelectedWord)
.delete(deleteWord);

module.exports = router;