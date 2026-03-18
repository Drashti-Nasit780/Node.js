const express = require('express');
const { addBlogPage, addBlog, viewBlog, editBlog, updateBlog, deleteBlog, viewSingleBlog } = require('../controller/blog.controller');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();

routes.get('/add-blog', addBlogPage);
routes.post('/add-blog', uploadImg.single('blogImg'), addBlog);
routes.get('/view-blog', viewBlog);
routes.get('/view-single/:id', viewSingleBlog)
routes.get('/edit-blog/:id', editBlog);
routes.post('/update-blog/:id', uploadImg.single('blogImg'), updateBlog);
routes.get('/delete-blog/:id', deleteBlog);

module.exports = routes;