const db = require('../models')
const Formation = db.formation
const Organism = db.organism
const Status = db.status
const Historique = db.historique

const AddFormation = async(req, res)=>{
    const {body}= req
    const findOrg = await Organism.findOne({name : body.organism})
    const status = await Status.findOne({name : "en attente"})
    const formation = await Formation.create({
        ...body,
        image: req.file.filename,
        organism: findOrg._id,
        status: status._id,
    })
    if(formation){res.send({msg : formation})
    }else{
        throw Error("Formation n'est pas crée")
    } 
}
const getFormation = async(req,res)=>{
    const formation = await Formation.find().populate('organism').populate('status');
    res.send(formation)
}
const getOneFormation = async(req,res)=>{
    let id = req.params.id
    const oneFormation = await Formation.findById(id)
    res.send(oneFormation)
}
const filtredFormation = async(req,res)=>{
    const historique = await Historique.find().populate('user').populate('formation')
    const user = await User.findById(historique.user).populate('organism')
    const formation = await Formation.findById(historique.formation)
    const today = new Date()
    const status = await Status.findOne({name: 'fini'})
    if(historique.fin.toDateString() === today.toDateString()){
       formation.status = status._id
       formation.save()
    }
    const fini = await Status.findOne({name: 'fini'})
    const attente = await Status.findOne({name: 'en attente'})
    const allFormation = await Formation.find({organism: user.organism})
    const formations = allFormation.filter(f=>f.status===fini || f.status===attente)
    if(formations) res.send(formations)
    else{
        throw Error("There's no formation over here")
    }
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
    DeleteFormation,
    filtredFormation
}