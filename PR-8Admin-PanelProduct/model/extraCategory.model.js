const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    extraCategoryName: String
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema);