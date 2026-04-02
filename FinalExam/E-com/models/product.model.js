const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);