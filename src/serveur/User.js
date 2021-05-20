const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, "User name too long"],
  },
  email: {
    type: String,
    required: true,
    maxlength: [30, "Email exceed the maximum length"],
  },
  password: {
    type: String,
    required: true,
  },

  followers: {
    type: Array,
    default: [],
  },

  following: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userShema);
