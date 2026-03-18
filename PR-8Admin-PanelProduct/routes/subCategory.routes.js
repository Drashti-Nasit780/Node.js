const express = require('express');
const { addSubcategoryPage, addSubcategory, viewSubcategory, deleteSubcategory, editSubcategory, updateSubcategory, subCategories } = require('../controller/subCategory.controller');
const routes = express.Router();
const uploadImg = require('../middleware/uploadImg');

routes.get('/add-subcategory', addSubcategoryPage);
routes.post('/add-subcategory', addSubcategory);
routes.get('/view-subcategory', viewSubcategory);
routes.get('/delete-subcategory/:id', deleteSubcategory);
routes.get('/edit-subcategory/:id', editSubcategory);
routes.post('/update-subcategory/:id', updateSubcategory);

routes.get('/getSubcategory', subCategories);

module.exports = routes;