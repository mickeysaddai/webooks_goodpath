var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.sampleUsersController);
// router.get('/current', usersController.getCurrentUserController);
router.post('/register', usersController.registerUsersController);
router.post('/login', usersController.loginUsersController)

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

module.exports = router;
