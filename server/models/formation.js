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
    status:{
      type: mongoose.Schema.Types.ObjectId,
          ref: "Status"
    },
    debut: Date,
    fin: Date,

  })
);

module.exports = Formation;