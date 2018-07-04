var express = require('express');
var router = express.Router();
var Controller = require('../controller/questionController');

/* GET users listing. */

router.post('/createquestion', Controller.createQuestion);
router.post('/createanswer', Controller.createAnswer);
router.get('/callquestion', Controller.callQuestion);
router.get('/onequestion/:id', Controller.oneQuestion);
router.delete('/deletequestion/:id', Controller.deleteQuestion);
router.delete('/deleteanswer/:id', Controller.deleteAnswer);
router.put('/upvoteanswer/:id',Controller.upvoteAnswer);
router.put('/downvoteanswer/:id',Controller.downvoteAnswer);
router.put('/upvotequestion/:id',Controller.upvoteQuestion);
router.put('/downvotequestion/:id',Controller.downvoteQuestion);


module.exports = router;
