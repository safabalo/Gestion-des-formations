const db = require('../models')
const { deleteOne } = require('../models/formation')
const Formation = db.formation
const Organism = db.organism

const AddFormation = async(req, res)=>{
    const {body}= req
    const findOrg = await Organism.findOne({name : body.organism})
    const formation = await Formation.create({
        ...body,
        organism: findOrg._id
    })
    res.send({msg : formation})
}
const getFormation = async(req,res)=>{
    const formation = await Formation.find();
    res.send(formation)
}
const getOneFormation = async(req,res)=>{
    let id = req.params
    const oneFormation = await Formation.findById(id)
    res.send(oneFormation)
}
const UpdateFormation = async(req,res)=>{
    let id = req.params
    const {body}= req.body
    const oneFormation = await Formation.findById(id)
    const UpdateFormation = await oneFormation.updateMany({},{$set:{name:body.name}, $set:{image:body.image}, $set:{duree:body.duree}})
    res.send(UpdateFormation)
}
const DeleteFormation = async(req,res)=>{
    let id = req.params
    const deleteFormation = await deleteOne({_id:id})
    res.send(deleteFormation)
}

module.exports={
    AddFormation,
    getFormation,
    getOneFormation,
    UpdateFormation,
    DeleteFormation
}