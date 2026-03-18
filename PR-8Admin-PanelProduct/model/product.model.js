const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        prodName: {
            type: String,
            required: true
        },

        prodDes: {
            type: String
        },

        prodPrice: {
            type: Number
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },

        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        },

        extracategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExtraCategory"
        },

        prodImg: {
            type: String
        }

    }
);

module.exports = mongoose.model("Product", productSchema);