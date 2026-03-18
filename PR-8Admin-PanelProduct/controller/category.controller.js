const Category = require('../model/category.model');
const Subcategory = require('../model/subCategory.model');
const ExtraCategory = require('../model/extraCategory.model');
const fs = require('fs');
const path = require('path');

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render('category/addCategory');
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.addCategory = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : "";
        const category = await Category.create({
            ...req.body,
            categoryImg: imgPath
        })
        return res.redirect("/category/view-category");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.viewCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        console.log(categories);
        return res.render('category/viewCategory', { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (category.categoryImg != "") {
            let imgpath = path.join(__dirname, "..", category.categoryImg);
            try {
                fs.unlinkSync(imgpath);
            } catch (error) {
                console.log('Something is missing');
            }
        }

        await Category.findByIdAndDelete(req.params.id);
        await Subcategory.deleteMany({ categoryId: req.params.id });
        await ExtraCategory.deleteMany({ categoryId: req.params.id });
        return res.redirect("/category/view-category");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.editCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        return res.render('category/editCategory', { category });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        const updateData = {
            categoryName: req.body.categoryName,
            categoryImg: req.body.categoryImg
        };

        if (req.file) {
            if (category.categoryImg) {
                const imgPath = path.join(__dirname, "..", category.categoryImg);
                try {
                    fs.unlinkSync(imgPath);
                } catch (err) {
                    console.log(err);
                }
            }

            updateData.categoryImg = `/uploads/${req.file.filename}`;
        }
        await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.redirect('/category/view-category');
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};