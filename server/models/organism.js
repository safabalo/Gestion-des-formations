const mongoose = require("mongoose");

const Organism = mongoose.model(
  "Organism",
  new mongoose.Schema({
    name: String,
    adress:String,
    phone:String
  })
);

module.exports = Organism;