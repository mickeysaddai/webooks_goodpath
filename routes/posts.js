const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validatePostInput = require('../validation/posts');
const passport = require('passport');
const fetchAndTriggerHooksForUser = require('../services/hooksService').fetchAndTriggerHooksForUser;
const hookTriggers = require('../constants/hookTriggers').HOOK_TRIGGERS

router.get('/', postsController.getAllPostsController)
router.get('/user/:user_id', postsController.getUserPostsController)
router.get('/:id', postsController.getSinglePostController)
// router.post('/',postsController.authenticatePostController)
router.delete('/:id', postsController.deleteSinglePostController)
router.put('/:id', postsController.putSinglePostController)

router.post("/",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
     
      const newPost = new Post({
        text: req.body.text,
        user: req.user.id
      });
  
      newPost.save().then(post => res.status(200).json(post));
    
      const hookData = {
      message: `${req.user.username} posted this ${req.body.text}`
    }
    fetchAndTriggerHooksForUser(req.user.id, hookData, hookTriggers.POST_CREATED )

    }
  );




module.exports = router;