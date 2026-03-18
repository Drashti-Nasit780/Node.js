const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    subCategoryName: String
});

module.exports = mongoose.model('SubCategory', subCategorySchema);