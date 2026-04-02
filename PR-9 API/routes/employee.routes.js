const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  loginEmployee,
  getProfile,
  updateProfile,
  getAllEmpolyees,
  addEmployee
} = require("../controller/employee.controller");

const { verifyEmployeeToken } = require("../middleware/verifyToken");

router.post("/login", loginEmployee);
router.get("/profile", verifyEmployeeToken, getProfile);
router.post("/add-employee", upload.single("image"), addEmployee);
router.put("/update", verifyEmployeeToken, upload.single("image"), updateProfile);
router.get("/get-all-employees", verifyEmployeeToken, getAllEmpolyees);

module.exports = router;