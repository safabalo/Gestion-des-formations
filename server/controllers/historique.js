const db = require('../models')
const Formation = db.formation
const User = db.user
const Organism = db.organism
const Status = db.status
const Historique = db.historique
let moment = require('moment')
let today = moment()

const addHistorique = async(req, res)=>{
   const {body}= req 
   const employer = await User.findOne({username: body.user})
   const formation = await Formation.findOne({name: body.formation})
   let start = new Date(body.debut)
   const end = new Date(body.fin)
   if(moment(today).format("YYYY-MM-DD") > moment(start).format("YYYY-MM-DD")){
      start = today
   }
   if(moment(end).format("YYYY-MM-DD") <= moment(start).format("YYYY-MM-DD") || moment(end).format("YYYY-MM-DD") <= moment(today).format("YYYY-MM-DD")) throw Error('Start date must be less than end date and more than one day')
   const historique = await Historique.create({
      formation: formation._id,
      user: employer._id,
      debut: start,
      fin: end
   })
   const status = await Status.findOne({name:'en cours...'})
   formation.status = status._id
   formation.save()
   if(!historique) throw Error('Error, try again')
   res.send(historique)
}
const getHistorique = async(req, res)=>{
   // Don't forget to put it in get Router of historique
   const historique = await Historique.find().populate('user').populate('formation')
   res.send(historique)
}
const getOneHistorique = async(req, res)=>{
   const historique = await Historique.findById(req.params.id)
   res.send(historique)
}
const updateHistorique = async(req, res)=>{
   const historique = req.params.id
   const {body}= req
   const employer = await User.findOne({username: body.user})
   const formation = await Formation.findOne({name: body.formation})
   const UpdateHistorique = await Historique.findByIdAndUpdate(historique,{
      ...body,
      user: employer._id,
      formation: formation._id
   })
   if(!UpdateHistorique) throw Error('Error, try again')
   res.json({message: `Historique is updated`, UpdateHistorique})
}

module.exports = {
   addHistorique,
   getHistorique,
   getOneHistorique,
   updateHistorique
}