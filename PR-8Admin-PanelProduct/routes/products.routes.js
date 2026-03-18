const express = require('express');
const routes = express.Router();
const uploadImg = require("../middleware/uploadImg");
const { addProduct, addProductPage, viewProduct, deleteProduct, updateProduct, editProduct } = require('../controller/products.controller');

routes.get('/add-product', addProductPage);
routes.post("/add-product", uploadImg.single("prodImg"), addProduct);
routes.get('/view-product', viewProduct);
routes.get('/delete-product/:id', deleteProduct);
routes.get('/edit-product/:id', editProduct);
routes.post('/update-product/:id', uploadImg.single("prodImg"), updateProduct);

module.exports = routes;