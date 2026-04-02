const Product = require("../models/product.model");

exports.createProduct = async(req,res)=>{

    const product = await Product.create({
        ...req.body,
        createdBy:req.user.id
    });

    res.json(product);
};


exports.getProducts = async(req,res)=>{

    const filter = {};

    if(req.query.category){
        filter.category = req.query.category;
    }

    const products = await Product
        .find(filter)
        .populate("category")
        .populate("createdBy","username");

    res.json(products);
};


exports.myProducts = async(req,res)=>{

    const products = await Product.find({
        createdBy:req.user.id
    }).populate("category");

    res.json(products);
};


exports.deleteProduct = async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({msg:"Deleted"});
};