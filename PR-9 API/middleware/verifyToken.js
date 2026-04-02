const Admin = require('../model/admin.model');
const Manager = require('../model/manager.model');
const Employee = require('../model/employee.model');

const jwt = require("jsonwebtoken");

exports.verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({
    success: false,
    message: "No Token"
  });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    const user = await Admin.findById(decoded.userId);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied"
      });
    }

    if (user) {
      req.user = user;
    }

    next();
  } catch (err) {
    res.json("Invalid Token");
  }
};

exports.verifyManagerToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.json("No Token");

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    const manager = await Manager.findById(decoded.managerId);

    if (decoded.role !== "manager") {
      return res.status(403).json({
  success: false,
  message: "Access Denied"
});
    }
    if(manager){
      req.user = manager;
    }
    next();
  } catch (err) {
    res.json("Invalid Token");
  }
};

exports.verifyEmployeeToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.json("No Token");

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    if (decoded.role !== "employee") {
      return res.status(403).json({
  success: false,
  message: "Access Denied"
});
    }
    const employee = await Employee.findById(decoded.employeeId);

    if (!employee) {
      return res.json("User not found");
    }
    req.user = employee;

    next();
  } catch (err) {
    res.json("Invalid Token");
  }
};

exports.verifyAllRoles = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No Token"
    });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    let user = null;
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.userId);
    }
    else if (decoded.role === "manager") {
      user = await Manager.findById(decoded.managerId);
    }
    else if (decoded.role === "employee") {
      user = await Employee.findById(decoded.employeeId);
    }
    else {
      return res.status(403).json({
        success: false,
        message: "Access Denied"
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};