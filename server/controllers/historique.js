const db = require('../models')
const Formation = db.formation
const User = db.user
const Organism = db.organism
const Status = db.status
const Historique = db.historique

const addHistorique = async(req, res)=>{
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
const getHistorique = async(req, res)=>{
   // Don't forget to put it in get Router of historique
   const historique = await Historique.find().populate('user').populate('formation')
   const formation = await Formation.findById(historique.formation)
   const status = await Status.findOne({name: 'fini'})
   if(historique.debut.getTime()=== historique.fin.getTime()){
      formation.status = status._id
      formation.save()
   }
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