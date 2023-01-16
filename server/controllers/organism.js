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
    let id = req.params.id
    const organism = await Organism.findById(id)
    res.send(organism)
}
const UpdateOrganism = async(req,res)=>{
    let id = req.params.id
    const body = req.body
    const UpdateOrganism = await Organism.findByIdAndUpdate(id,{
        ...body
    })
    if(!UpdateOrganism) throw Error('Error, try again')
    res.json({message: `Organism ${body.name} is updated`, UpdateOrganism})
    
}
const DeleteOrganism = async(req,res)=>{
    let id = req.params.id
    const deleteOrg = await Organism.findByIdAndDelete(id)
    if(!deleteOrg) throw Error('Error, try again')
    res.json({message: `Organism is deleted`, deleteOrg})
    
}

module.exports={
    AddOrganism,
    getOrganism,
    getOneOrganism,
    UpdateOrganism,
    DeleteOrganism
}