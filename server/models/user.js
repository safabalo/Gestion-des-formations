const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image:String,
    role: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ,
    organism: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Organisation"
    },
    status: Boolean
  })
);

module.exports = User;