const passport = require("passport");
const Hook = require("../models/Hook");

const getAllHooksController = async (req, res) => {
  Hook.find()
    .then((hooks) => res.json(hooks))
    .catch((err) => res.status(404).json({ nohooksfound: "No hooks found" }));
};

const getUserHooksController = (req, res) => {
  Hook.find({ user: req.params.user_id })
    .then((hooks) => res.json(hooks))
    .catch((err) => res.status(404).json({ nohooksfound: "No hooks found" }));
};

const putSingleHookController = (req, res) => {
  Hook.findByIdAndUpdate(req.params.id, req.body)
    .then(async (hook) => {
      res.json(hook);
      const discordPayload = {
        message: `Updated hook notification: "${hook.url}"`,
        avatarUrl: "No avatar",
      };
      try {
        await discordService.discordPostService(discordPayload);
      } catch (err) {
        console.log("Discord error", err);
      }
    })
    .catch((err) => res.json(err));
};

const deleteSingleHookController = (req, res) => {
  const { id } = req.params;
  Hook.findOneAndDelete({ _id: id })
    .then(async () => {
      res.status(200).json({ sucess: "Hook successfully deleted" });

      const discordPayload = {
        message: "A hook was deleted",
        avatarUrl: "No avatar",
      };
      try {
        await discordService.discordPostService(discordPayload);
      } catch (err) {
        console.log("Discord error", err);
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getAllHooksController,
  getUserHooksController,
  deleteSingleHookController,
  putSingleHookController,
};
