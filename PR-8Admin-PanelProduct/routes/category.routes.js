const express = require('express');
const { addCategoryPage, addCategory, viewCategory, editCategory, updateCategory, deleteCategory } = require('../controller/category.controller');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();

routes.get('/add-category', addCategoryPage);
routes.post('/add-category', uploadImg.single('categoryImg'), addCategory);
routes.get('/view-category', viewCategory);
routes.get('/edit-category/:id', editCategory);
routes.post('/update-category/:id', uploadImg.single('categoryImg'), updateCategory);
routes.get('/delete-category/:id', deleteCategory);

module.exports = routes;