const User = db.user
const Formation = db.formation
const organism = db.organism
const Role = db.role
const Status = db.status

const Statistiques = async(req, res)=>{
    const role = await Role.findOne({name: "employe"})
    let employes = await User.count({role:{role: role._id}})
    let formations = await Formation.count()
    let organismes = await organism.count()
    res.json({
        employes,
        formations,
        organismes
    })

}
module.exports = {
    Statistiques
}