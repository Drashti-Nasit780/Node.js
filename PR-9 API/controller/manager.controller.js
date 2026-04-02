const Manager = require("../model/manager.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");

// MANAGER LOGIN
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await Manager.findOne({ email, isDelete: false });
    if (!manager) {
  return res.status(404).json({
    success: false,
    message: "Manager not found"
  });
}

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Wrong password"
  });
}

    const token = jwt.sign(
      { managerId: manager._id, role: manager.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.send(err.message);
  }
};

exports.profile = async (req, res) => {
  try {
    return res.json({message: "My Profile", user: req.user});
  } catch (error) {
    console.log(error)
    return res.json({message: 'Internal Server Error'}); 
  }
}

exports.updateProfile = async (req, res) => {
  try {
        if (req.file) {
      req.body.image = req.file.filename;
    }

    let user = await Manager.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    return res.json({message: "My Profile update success", user: user});
  } catch (error) {
    console.log(error)
    return res.json({message: 'Internal Server Error'}); 
  }
}

exports.createManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password,phoneNumber,gender,position } = req.body;

    const exist = await Manager.findOne({ email, isDelete: false });
    if (exist) return res.send("Manager already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

  const manager = await Manager.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    gender,
    position,
    role: "manager",
    image: req.file ? req.file.filename : null,
  });

    // send Email for Login Credntial
await transporter.sendMail({
  from: "shreyapal0411@gmail.com",
  to: email,
  subject: "You are added as Manager",
  html: `
    <h2>Hello ${firstName}</h2>
    <p>You have been added as a Manager by Admin: ${req.user.firstName}.</p>
    
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${password}</p>

    <a href="http://localhost:8000/manager/login">Login</a>
  `
});

res.json({ message: "Manager Added + Email Sent" });

} catch (err) {
  res.send(err.message);
}
};

exports.getManagers = async (req, res) => {
  try {
    const managers = await Manager.find({isDelete: false}).select("-password");
    res.json(managers);
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateManager = async (req, res) => {
  try {
    const { id } = req.params;

    let manager = await Manager.findById(id);

    if(!manager || manager.isDelete == true){
      return res.json({message: 'Manager is Missing'});
    }

    await Manager.findByIdAndUpdate(id, req.body, {new: true});

    res.json({message: "Manager Updated"});
  } catch (err) {
    res.send(err.message);
  }
};

// DELETE MANAGER
exports.deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    let manager = await Manager.findById(id);
    if(!manager){
      return res.json({message: 'Manager is Missing'});
    }
    await Manager.findByIdAndUpdate(id, {isDelete: true}, {new: true});
    res.status(200).json({
    success: true,
    message: "Manager Deleted"
    });
  } catch (err) {
    res.send(err.message);
  }
};

