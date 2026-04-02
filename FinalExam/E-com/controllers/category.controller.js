const Category = require("../models/category.model");

exports.createCategory = async(req,res)=>{
    const category = await Category.create(req.body);
    res.json(category);
};

exports.getCategories = async(req,res)=>{
    const data = await Category.find();
    res.json(data);
};

exports.updateCategory = async(req,res)=>{
    const data = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(data);
};

exports.deleteCategory = async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id);
    res.json({msg:"Deleted"});
};