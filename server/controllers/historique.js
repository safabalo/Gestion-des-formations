const db = require('../models')
const Formation = db.formation
const User = db.user
const Organism = db.organism
const Status = db.status
const Historique = db.historique

const addHistorique = async(req, res)=>{
   const {body}= req 
   const today = new Date()
   const employer = await User.findOne({username: body.user})
   const formation = await Formation.findOne({name: body.formation})
   let start = new Date(body.debut)
   const end = new Date(body.fin)
   if(today > start){
      start = today
   }
   if(Date.parse(end) <= Date.parse(start) || Date.parse(end) <= Date.parse(today)) throw Error('Start date must be less than end date and more than one day')
   const historique = await Historique.create({
      formation: formation._id,
      user: employer._id,
      debut: start,
      fin: end
   })
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
   const UpdateHistorique = await Historique.findByIdAndUpdate(historique,{
      ...body
   })
   if(!UpdateHistorique) throw Error('Error, try again')
   res.json({message: `Historique ${body.name} is updated`, UpdateHistorique})
}

module.exports = {
   addHistorique,
   getHistorique,
   getOneHistorique,
   updateHistorique
}