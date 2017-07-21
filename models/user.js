const mongoose = require("mongoose");
      passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: String,
  picture: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);