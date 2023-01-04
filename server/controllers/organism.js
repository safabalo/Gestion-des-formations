const db = require('../models')
const Organism = db.organism

const AddOrganism = async(req, res)=>{
    const {body} = req
    const organism = await Organism.create({
        ...body
    })
    res.send(organism)
}
const getOrganism = async(req,res)=>{
    const organism = await Organism.find()
    res.send(organism)
}
const getOneOrganism = async(req,res)=>{
    let id = req.params
    const organism = await Organism.findById(id)
    res.send(organism)
}
const UpdateOrganism = async(req,res)=>{
    let id = req.params
    const organism = await Organism.findById(id)
    const UpdateOrganism = await organism.updateMany({},{$set:{name:body.name}, $set:{image:body.image}, $set:{duree:body.duree}})
    res.send(UpdateOrganism)
}
const DeleteOrganism = async(req,res)=>{
    let id = req.params
    const deleteOrg = await Organism.deleteOne({_id:id})
    res.send(deleteOrg)
}

module.exports={
    AddOrganism,
    getOrganism,
    getOneOrganism,
    UpdateOrganism,
    DeleteOrganism
}