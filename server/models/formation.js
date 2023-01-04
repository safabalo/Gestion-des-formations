const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    image: Buffer,
    organism: {
      type: mongoose.Schema.Types.ObjectId,
          ref: "Organism"
    },
    duree:Number
  })
);

module.exports = Formation;