const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogImg: String,
    title: String,
    description: String,
    author: String,
    category: String,
    publishDate: {
        type: Date,
    },
    content: String,
});

module.exports = mongoose.model('Blog', blogSchema);
