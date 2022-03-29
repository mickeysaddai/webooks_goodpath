var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.sampleUsersController);
router.post('/register', usersController.registerUsersController);
router.post('/login', usersController.loginUsersController)


module.exports = router;
