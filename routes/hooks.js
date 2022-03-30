const express = require('express');
const router = express.Router();
const hooksController = require('../controllers/hooksController')

router.post('/hook', hooksController.sampleHookController)
router.post('/registerUser',hooksController.registerUsersController )
module.exports = router;



