const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


router.get('/', postsController.allPostsController)
router.get('/user/:user_id', postsController.userPostsController)
router.get('/:id', postsController.singlePostController)
router.post('/',postsController.authenticatePostController)


module.exports = router;