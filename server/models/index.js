const mongoose = require('mongoose');


const db = {};

db.mongoose = mongoose;
db.formation = require('./formation')
db.user = require('./user')
db.organism = require('./organism')
db.role = require('./role')

db.role.estimatedDocumentCount((err, count) => {
    if (!err && count != 2) {
        db.role.findOne({name: 'admin'})
            .then((e)=>{
                if(!e){
                    new db.role({
                        name: "admin"
                    })
                    .save(err => {
                        if(err) {console.log("error", err)}
                        console.log("'admin' added to roles collection");
                    });
                }
            })
            .catch((error)=>{ console.log(error) })

        db.role.findOne({name: 'employe'})
            .then((e)=>{
                if(!e){
                    new db.role({
                        name: "employe"
                    })
                    .save(err => {
                        if(err) {console.log("error", err)}
                        console.log("'employé' added to roles collection");
                    });
                }
            })
            .catch((error)=>{ console.log(error) })

    }
});
module.exports = db;