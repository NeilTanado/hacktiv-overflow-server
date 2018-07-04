var express = require('express');
var router = express.Router();
var Controller = require('../controller/userController');

/* GET users listing. */
router.post('/createuser',Controller.createUser);
router.post('/login',Controller.signin);

module.exports = router;
