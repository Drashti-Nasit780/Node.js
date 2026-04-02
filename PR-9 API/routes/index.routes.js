const express = require("express");
const router = express.Router();

// import all routes
const adminRoutes = require("./admin.routes");
const managerRoutes = require("./manager.routes");
const employeeRoutes = require("./employee.routes");

// use routes
router.use("/admin", adminRoutes);
router.use("/manager", managerRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;