const Blog = require('../model/blog.model');
const fs = require('fs');
const path = require('path');

exports.addBlogPage = (req, res) => {
    try {
        res.render('Blog/addBlog', { blog: null });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.addBlog = async (req, res) => {
    let imgPath = req.file ? `/uploads/${req.file.filename}` : '';

    let blog = await Blog.create({
        ...req.body,
        blogImg: imgPath
    });
    return res.redirect('/Blog/view-blog');
};

exports.viewBlog = async (req, res) => {
    try {
        let search = req.query.search || "";

        let filter = {};

        if (search.trim() !== "") {
            filter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } }
                ]
            };
        }

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });

        res.render('Blog/viewBlog', {
            blogs,
            search
        });

    } catch (error) {
        console.log(error);
        res.redirect('/Blog/view-blog');
    }
};

exports.deleteBlog = async (req, res) => {
    let id = req.params.id;
    let blog = await Blog.findById(id);

    if (!blog) {
        console.log("Blog not found..");
        return res.redirect('/');
    }

    if (blog.blogImg != "") {
        let imgpath = path.join(__dirname, "..", blog.blogImg);
        try {
            fs.unlinkSync(imgpath);
        } catch (error) {
            console.log('Something is missing');
        }
    }

    await Blog.findByIdAndDelete(id);
    return res.redirect('/Blog/view-blog');
};

exports.editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        return res.render('Blog/addBlog', { blog });
    } catch (error) {
        console.log(error);
        return res.redirect('/Blog/view-blog');
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.redirect('/Blog/view-blog');
        }

        let imgPath = blog.blogImg;

        if (req.file) {
            if (blog.blogImg) {
                const oldPath = path.join(__dirname, "..", blog.blogImg);
                try {
                    fs.unlinkSync(oldPath);
                } catch (error) {
                    console.log("Old image not found");
                }
            }
            imgPath = `/uploads/${req.file.filename}`;
        }

        await Blog.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author,
            publishDate: req.body.publishDate,
            category: req.body.category,
            blogImg: imgPath
        });

        return res.redirect('/Blog/view-blog');
    } catch (error) {
        console.log(error);
        return res.redirect('/Blog/view-blog');
    }
};

exports.viewSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('Blog/singleBlog', { blog });
    } catch (error) {
        console.log(error);
        res.redirect('/Blog/view-blog');
    };
};