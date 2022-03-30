const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


router.get('/', postsController.getAllPostsController)
router.get('/user/:user_id', postsController.getUserPostsController)
router.get('/:id', postsController.getSinglePostController)
router.post('/',postsController.authenticatePostController)
router.delete('/:id', postsController.deleteSinglePostController)
router.put('/:id', postsController.putSinglePostController)




module.exports = router;