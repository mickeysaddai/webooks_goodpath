const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  secretToken: {
    type: String,
    required: false,
  },
  trigger: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Hook = mongoose.model("hook", HookSchema);
