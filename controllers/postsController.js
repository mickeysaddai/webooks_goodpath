const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../models/Post');
const validatePostInput = require('../validation/posts')

const allPostsController = (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};


const userPostsController = (req, res) => {
    Post.find({user: req.params.user_id})
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts found from that user' }
        )
    );
}

const singlePostController = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
};

const authenticatePostController = passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newPost = new Post({
        text: req.body.text,
        user: req.user.id
      });
  
      newPost.save().then(post => res.json(post));
    }
  

module.exports = {
    allPostsController,
    singlePostController,
    userPostsController,
    authenticatePostController

}