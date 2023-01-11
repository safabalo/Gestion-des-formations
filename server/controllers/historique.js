const db = require('../models')
const Formation = db.formation
const User = db.user
const Organism = db.organism
const Status = db.status
const Historique = db.historique

const AddHistorique = async(req, res)=>{
   const employer = await User.findById(req.params.id)
   const {body}= req
   const start = new Date(body.debut)
   const end = new Date(body.fin)
   const historique = await Historique.create({...body, user: employer._id,
      debut: start,
      fin: end
   })
   res.send(historique)
}
const GetHistorique = async(req, res)=>{
   const historique = await Historique.find().populate('user').populate('formation')
   res.send(historique)
}
const GetOneHistorique = async(req, res)=>{
   const historique = await Historique.findById(req.params.id)
   res.send(historique)
}
const UpdateHistorique = async(req, res)=>{
   const historique = req.params.id
   const {body}= req
   const UpdateHistorique = await Historique.findByIdAndUpdate(historique,{
      ...body
   })
   if(!UpdateHistorique) throw Error('Error, try again')
   res.json({message: `Historique ${body.name} is updated`, UpdateHistorique})
}

module.exports = {
   AddHistorique,
   GetHistorique,
   GetOneHistorique,
   UpdateHistorique
}