const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    category: String,
    shortDesc: String,
    fullDesc: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);