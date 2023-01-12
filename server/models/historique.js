const mongoose = require("mongoose");

const Historique = mongoose.model(
  "Historique",
  new mongoose.Schema({
    formation: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Formation"
        }
      ,
    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ,
    debut: Date,
    fin: Date,
  })
);

module.exports = Historique;