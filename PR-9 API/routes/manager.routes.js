const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyManagerToken } = require("../middleware/verifyToken");
const { verifyAllRoles } = require("../middleware/verifyToken");

const {loginManager,profile,updateProfile} = require("../controller/manager.controller");
const {addEmployee,getAllEmpolyees,updateEmployee,deleteEmployee} = require("../controller/employee.controller");

router.post("/login", loginManager);
router.get("/profile", verifyManagerToken, profile);
router.put("/update", verifyManagerToken,upload.single("image"), updateProfile);

// Employee management
router.post("/add-employee", verifyManagerToken,upload.single("image"), addEmployee);
router.get("/get-all-employees", verifyAllRoles, getAllEmpolyees);
router.put("/update-employee/:id", verifyManagerToken,upload.single("image"), updateEmployee);
router.delete("/delete-employee/:id", verifyManagerToken, deleteEmployee);

module.exports = router;
