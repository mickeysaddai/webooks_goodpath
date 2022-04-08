const passport = require("passport");
const Post = require("../models/Post");
const User = require("../models/User");
const validatePostInput = require("../validation/posts");
const discordService = require("../services/discordService");
const hooksController = require("../controllers/hooksController");
const { HOOK_TRIGGERS } = require("../constants/hookTriggers");
const { fetchAndTriggerHooksForUser } = require("../services/hooksService");

const getAllPostsController = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
};

const getUserPostsController = (req, res) => {
  Post.find({ user: req.params.user_id })
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ nopostsfound: "No posts found from that user" })
    );
};

const getSinglePostController = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
};

const putSinglePostController = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(async (post) => {
      res.json(post);
      User.findById(post.user).then(async (user) => {
        const hookPayload = {
          message: `Updated post notification: "${post.text}" by ${user.username} to ${req.body.text}`,
          avatarUrl: "No avatar",
        };
        fetchAndTriggerHooksForUser(
          user._id,
          hookPayload,
          HOOK_TRIGGERS.POST_UPDATED
        );
        await discordService.discordPostService(hookPayload);
      });
    })
    .catch((err) => res.json(err));
};

const deleteSinglePostController = (req, res) => {
  const { id } = req.params;
  Post.findOneAndDelete({ _id: id })
    .then(async (deletedPost) => {
      console.log(deletedPost);
      res.status(200).json({ sucess: "Post successfully deleted" });
      User.findById(deletedPost.user).then(async (user) => {
        const hookPayload = {
          message: `This post was deleted: ${deletedPost.text}`,
          avatarUrl: "No avatar",
        };
        fetchAndTriggerHooksForUser(
          user._id,
          hookPayload,
          HOOK_TRIGGERS.POST_DELETED
        );
        await discordService.discordPostService(hookPayload);
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getAllPostsController,
  getSinglePostController,
  getUserPostsController,
  // authenticatePostController,
  putSinglePostController,
  deleteSinglePostController,
};
