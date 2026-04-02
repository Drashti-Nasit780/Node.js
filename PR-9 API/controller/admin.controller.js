const User = require("../model/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {firstName, lastName,email, password, phoneNumber,gender, position } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      image: req.file ? req.file.filename : null,
      gender,
      position,
      role: "admin",
      isDelete: false
    });
    await admin.save();

    res.status(201).json({
  success: true,
  message: "Admin Registered"
});
  } catch (err) {
    res.status(500).json({
  success: false,
  message: err.message
});
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin"});
    if (!admin) return res.send("Admin not found");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.send("Wrong password");
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );
    res.json({ token });

  } catch (err) {
    res.send(err.message);
  }
};


// PROFILE
exports.profile = async (req, res) => {
  try {
    const admin = await User.findOne({_id: req.user._id,isDelete: false}).select("-password");
    res.json({
      success: true,
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


//  UPDATE
exports.update = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      { _id: req.user._id, isDelete: false },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.send(err.message);
  }
};

// DELETE
exports.Adelete = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
  req.user._id,
  { isDelete: true },
  { new: true }
);
    res.json({
      success: true,
      message: "Admin Soft Deleted"
    });
  } catch (err) {
    res.send(err.message);
  }
};