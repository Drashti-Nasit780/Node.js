const express = require('express');
const {
    addBlogPage,
    insertBlog,
    viewBlogPage,
    singleBlog,
    editBlogPage,
    updateBlog,
    deleteBlog
} = require('../controller/blog.controller');
const uploadImage = require('../middleware/uploadimg');
const routes = express.Router();

routes.get('/add-blog', addBlogPage);
routes.post(
    '/insert-blog',
    uploadImage.single('profileImage'),
    insertBlog
);
routes.get('/view-blog', viewBlogPage);
routes.get('/view/:id', singleBlog);
routes.get('/edit/:id', editBlogPage);
routes.post(
    '/update/:id',
    uploadImage.single('profileImage'),
    updateBlog
);
routes.get('/delete/:id', deleteBlog);
module.exports = routes;