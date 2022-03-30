const passport = require('passport');

const Post = require('../models/Post');
const validatePostInput = require('../validation/posts')

const getAllPostsController = (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};


const getUserPostsController = (req, res) => {
    Post.find({user: req.params.user_id})
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts found from that user' }
        )
    );
}

const getSinglePostController = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
};



const authenticatePostController = (passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newPost = new Post({
        text: req.body.text,
        // user: req.user.id
      });
  
      newPost.save().then(post => res.json(post));
      
    }
  );

  
  const putSinglePostController = (req, res) => {
       Post.findByIdAndUpdate(req.params.id, req.body)
       .then(event => res.json(event))
       .catch(err => res.json(err))
  
  };


const deleteSinglePostController = (req, res) => {
    
    const {id} = req.params
    Post.findOneAndDelete({_id: id})
        .then(() => res.status(200).json({sucess: "Post successfully deleted"}))
        .catch(err => {res.json(err)})
};



module.exports = {
    getAllPostsController,
    getSinglePostController,
    getUserPostsController,
    authenticatePostController,
    putSinglePostController,
    deleteSinglePostController

}