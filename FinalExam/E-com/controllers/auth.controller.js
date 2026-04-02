const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{

    const {username,email,password,role} = req.body;

    const hash = await bcrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        password:hash,
        role
    });

    res.json(user);
};


exports.login = async(req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.json({msg:"User not found"});

    const match = await bcrypt.compare(password,user.password);

    if(!match) return res.json({msg:"Wrong Password"});

    const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token",token);

    res.json({msg:"Login Success"});
};


exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.json({msg:"Logout Success"});
};