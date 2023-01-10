const db = require('../models')
const { deleteOne } = require('../models/formation')
const Formation = db.formation
const Organism = db.organism
const Status = db.status

const AddFormation = async(req, res)=>{
    const {body}= req
    const findOrg = await Organism.findOne({name : body.organism})
    const start = new Date(body.debut)
    const end = new Date(body.fin)
    const status = await Status.findOne({name : "en attente"})
    const formation = await Formation.create({
        ...body,
        image: req.file.filename,
        organism: findOrg._id,
        status: status._id,
        debut: start,
        fin: end
    })
    if(formation){res.send({msg : formation})
    }else{
        throw Error("Formation n'est pas crée")
    } 
}
const getFormation = async(req,res)=>{
    const formation = await Formation.find().populate('organism').populate('status');
    console.log(formation)
    res.send(formation)
}
const getOneFormation = async(req,res)=>{
    let id = req.params.id
    const oneFormation = await Formation.findById(id)
    res.send(oneFormation)
}
const UpdateFormation = async(req,res)=>{
    const id = req.params.id
    const {body}= req
    const findOrg = await Organism.findOne({name : body.organism})
    const UpdateFormation = await Formation.findByIdAndUpdate(id,{
        ...body,
        organism: findOrg._id
    })
    if(!UpdateFormation) throw Error('Error, try again')
    res.json({message: `Formation ${body.name} is updated`, UpdateFormation})
}
const DeleteFormation = async(req,res)=>{
    let id = req.params.id
    const deleteFormation = await Formation.findByIdAndDelete(id)
    if(!deleteFormation) throw Error('Error, try again')
    res.json({message: `Formation ${body.name} is updated`, deleteFormation})
}

module.exports={
    AddFormation,
    getFormation,
    getOneFormation,
    UpdateFormation,
    DeleteFormation
}