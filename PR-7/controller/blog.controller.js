const Blog = require('../modal/blog.modal');

exports.addBlogPage = (req, res) => {
    res.render('blog/add-blog');
};

exports.insertBlog = async (req, res) => {
    const newBlog = {
        title: req.body.title,
        image: req.file ? req.file.filename : '',
        author: req.body.author,
        category: req.body.category,
        shortDesc: req.body.shortDesc,
        fullDesc: req.body.fullDesc
    };

    await Blog.create(newBlog);
    res.redirect('/blog/view-blog');
};
exports.viewBlogPage = async (req, res) => {
    const blogs = await Blog.find();
    console.log("Blogs Data:", blogs);  // 👈 ADD THIS
    res.render('blog/view-blog', { blogs });
};

exports.singleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blog/single-blog', { blog });
};
exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog/view-blog');
};
exports.editBlogPage = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blog/edit-blog', { blog });
};

// Update 
exports.updateBlog = async (req, res) => {
    const updatedData = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        shortDesc: req.body.shortDesc,
        fullDesc: req.body.fullDesc
    };
    if (req.file) {
        updatedData.image = req.file.filename;
    }

    await Blog.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/blog/view/' + req.params.id);
};