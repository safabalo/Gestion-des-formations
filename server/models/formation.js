const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    image: String,
    organism: {
      type: mongoose.Schema.Types.ObjectId,
          ref: "Organism"
    },
    duree:Number
  })
);

module.exports = Formation;