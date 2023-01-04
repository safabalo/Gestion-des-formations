const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image:String,
    role: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Organisation"
    },
    formation: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Formation"
        }
      ],
    status: Boolean
  })
);

module.exports = User;