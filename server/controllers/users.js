const mailer = require('../middlewares/nodeMailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = 10
const db = require('../models')
let storage = require('local-storage')
const Historique = require('../models/historique')
const Organism = require('../models/organism')

const User = db.user
const formation = db.formation
const organism = db.organism
const Role = db.role


const login = async(req,res)=>{
    const { body } = req;
    if (!body.email || !body.password) throw Error("Fill the all fields to login");
    const user = await User.findOne({ email: body.email });
    if (!user || !(await bcrypt.compare(body.password, user.password))) throw Error("Email or password is incorect");
    if (!user.status) throw Error("You can't to login");
    const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
    storage("token", token);
    const user_role = await Role.findById(user.role);
    res.json({ message: "Login success", username: user.username, _id: user._id, email: user.email, role: user_role.name, token: storage("token") });
}
const addEmployer = async(req,res)=>{
    const { body } = req;
    if (!body) {
      res.status(400);
      res.json({ message: "all fiels id required" });
    }
    let password = Math.random().toString(36).substr(2, 8);
    const double = await User.findOne({ email: body.email }).exec();
    if (double) return res.status(409).json({ message: "This email already exist" }); //Conflict
    const role = await Role.findOne({ name: "employe" });
    const organism = await Organism.findOne({name: body.organism})
    let hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      ...body,
      organism: organism._id,
      image: req.file.filename,
      status: true,
      role: role._id,
      password: hashedpassword,
    });
    const  msg = `<div>
    <h3>Hello ${user.username}<h3>
    <div>
      <div>Congratulation you just joined our employer</div> 
      <div>List you can find your password bellow</div>
      <div>Your email: <strong>${user.email}</strong></div>
      <div>Password:<strong>${password}</strong></div>
      <div>Click the button bellow to access to login page</div>
      <a href="#" style="background-color: #f59e0b; border: none;color: white;padding: 15px 32px; text-align: center; text-decoration: none;display: inline-block;">
        Log here
      </a>
    </div>
    `;
    if (user) {
      mailer.main(user, msg);
      res.json({ message: "Successfully, An email is sent to account", email: user.email, password: password });
    } else {
      throw Error("User not created try again");
    }

}
const updateEmployer = async(req,res)=>{
  const {body} = req
  const {id} = req.params
  const token = storage.getItem("token");
  const user = jwt.verify(token,process.env.TOKEN_KEY)
  const UpdateEmployer = await User.findByIdAndUpdate(id,{
    ...body,
    image: req.file.filename,
  })
  if(!UpdateEmployer) throw Error('Error, try again')
    res.json({message: `Employer ${body.username} is updated`, UpdateEmployer})
  
}
const Employer = async(req,res)=>{
    const role = await Role.findOne({name: "employe"})
    const employer = await User.find({role: role._id}).populate('role')
    if(!employer) throw Error('Error, try again')
    res.json({message: 'List of employer', employer})
}
const filterUser = async(req,res)=>{
    const role = await Role.findOne({name: "employe"})
    const today = new Date()
    const employer= await User.find({role: role._id})
    if(!employer) throw Error('Error, try again')
    const historique = await Historique.find().populate('user').populate('formation')
    if(!historique) throw Error('Error, try again')
    const filter = historique.filter(i =>{ return i.fin.toDateString()===today.toDateString()})
    const filterEmployer = employer.filter(e=>{return !filter.includes(e)})
    res.json({message: 'List of employer', filterEmployer})
}
const logout = async(req,res)=>{
    storage.removeItem("token");
    res.json({ message: "Logout success" });
}

module.exports={
    login,
    Employer,
    addEmployer,
    updateEmployer,
    filterUser,
    logout
}