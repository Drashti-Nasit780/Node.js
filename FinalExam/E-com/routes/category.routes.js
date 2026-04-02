const router = require("express").Router();
const controller = require("../controllers/category.controller");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.post("/",auth,role("admin"),controller.createCategory);
router.get("/",controller.getCategories);
router.put("/:id",auth,role("admin"),controller.updateCategory);
router.delete("/:id",auth,role("admin"),controller.deleteCategory);

module.exports = router;