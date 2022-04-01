const passport = require('passport');
const Post = require('../models/Post');
const validatePostInput = require('../validation/posts');
const discordService = require('../services/discordService')

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


  
  const putSinglePostController = (req, res) => {
       Post.findByIdAndUpdate(req.params.id, req.body)
       .then(async post => {
           res.json(post)
           const discordPayload = {
                   message: `Updated post notification: "${post.text}"`,
                   avatarUrl: "No avatar"
               }
               try {
                   await discordService.discordPostService(discordPayload)

               } catch(err) {
                   console.log("Discord error",err)
               }  
        })
       .catch(err => res.json(err))
  
  };


const deleteSinglePostController = (req, res) => {
    
    const {id} = req.params
    Post.findOneAndDelete({_id: id})
        .then(async() => {
            res.status(200).json({sucess: "Post successfully deleted"})

            const discordPayload = {
                   message: 'A post was deleted',
                   avatarUrl: "No avatar"
               }
               try {
                   await discordService.discordPostService(discordPayload)

               } catch(err) {
                   console.log("Discord error",err)
               }  
        })
        .catch(err => {res.json(err)})
};



module.exports = {
    getAllPostsController,
    getSinglePostController,
    getUserPostsController,
    // authenticatePostController,
    putSinglePostController,
    deleteSinglePostController

}