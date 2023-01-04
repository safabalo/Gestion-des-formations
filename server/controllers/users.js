const mailer = require('../middlewares/nodeMailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = 10
const db = require('../models')
let storage = require('local-storage')

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
    const role = await Role.findOne({ role: "employe" });
    let hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      ...body,
      status: true,
      role: role._id,
      password: hashedpassword,
    });
    if (user) {
      mailer.main("addEmployer", { email: user.email, password });
      res.json({ message: "Successfully, An email is sent to account", email: user.email, password: password });
    } else {
      throw Error("User not created try again");
    }
}


module.exports={
    login,
    addEmployer
}