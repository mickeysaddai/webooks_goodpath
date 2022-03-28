const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.sampleIndexController)
module.exports = router;

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



