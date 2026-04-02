const router = require("express").Router();
const controller = require("../controllers/product.controller");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.post("/",auth,role("admin"),controller.createProduct);

router.get("/",controller.getProducts);

router.get("/my",auth,controller.myProducts);

router.delete("/:id",auth,role("admin"),controller.deleteProduct);

module.exports = router;