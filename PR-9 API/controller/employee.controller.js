const Employee = require("../model/employee.model");
const bcrypt = require("bcrypt");
const transporter = require("../config/mail");

exports.addEmployee = async (req, res) => {
  try {
    const { firstName, email, password } = req.body; 
    let emp = await Employee.findOne({
      email: email,
      isDelete: false,
    });
    if (emp) {
      return res.json({ message: "Employee already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    emp = await Employee.create({
      ...req.body,
      password: hashPassword,
      image: req.file ? req.file.filename : null,
    });
    await transporter.sendMail({
      from: "shreyapal0411@gmail.com",
      to: email,
      subject: "You are added as Employee",
      html: `
        <h2>Hello ${firstName}</h2>
        <p>You have been added as an Employee by Manager: ${req.user.firstName}</p>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>

        <a href="http://localhost:8000/employee/login">Login</a>
      `
    });

    return res.status(201).json({
      success: true,
      message: "Employee Added + Email Sent",
      data: emp
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.json({ message: "Server Error" });
  }
};

exports.getAllEmpolyees = async (req, res) => {
  try {
    let employees = await Employee.find({ isDelete: false });
    return res.json({ message: "Get All Employees", employees });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Server Error" });
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.json({ message: "Employee not Found" });
    }

    let updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.json({ message: "Employee Updated", employee });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.json({ message: "Employee not Found" });
    }

    await Employee.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );

    return res.json({ message: "Employee Deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Server Error" });
  }
};
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email, isDelete: false });

    if (!employee) {
      return res.json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    const token = require("jsonwebtoken").sign(
      { employeeId: employee._id, role: "employee" },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login Success", token });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    return res.json({ message: "My Profile", user: req.user });
  } catch (error) {
    return res.json({ message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    let employee = await Employee.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );

    return res.json({ message: "Profile Updated", employee });
  } catch (error) {
    return res.json({ message: "Server Error" });
  }
};