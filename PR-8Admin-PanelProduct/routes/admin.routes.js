const express = require('express');
const { addAdminPage, addAdmin, viewAllAdmin, deleteAdmin, updateAdmin, editAdmin } = require('../controller/admin.controller');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();
const passport = require('passport');

routes.get('/add-admin', addAdminPage);
routes.post('/add-admin', uploadImg.single('profileImage'), addAdmin);

routes.get('/view-admin', passport.checkAuthenticate, viewAllAdmin);

routes.get('/edit-admin/:id', editAdmin);


routes.post('/update-admin/:id', uploadImg.single('profileImage'), updateAdmin);

routes.get('/delete-admin/:id', deleteAdmin);

module.exports = routes;