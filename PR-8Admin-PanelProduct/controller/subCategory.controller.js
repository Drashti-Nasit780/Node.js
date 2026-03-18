const Category = require('../model/category.model');
const SubCategory = require('../model/subCategory.model');

exports.subCategories = async (req, res) => {
    try {
        let subcategories = await SubCategory.find({ categoryId: req.query.categoryId });
        return res.json(subcategories);
    } catch (error) {
        console.log(error);
        res.json('/');
    }
};

exports.addSubcategoryPage = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render('subcategory/addSubcategory', { categories })
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.addSubcategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.create(req.body);
        return res.redirect('/subcategory/view-subcategory');
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.viewSubcategory = async (req, res) => {
    try {
        let subcategories = await SubCategory.find().populate('categoryId');
        return res.render('subcategory/viewSubcategory', { subcategories });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.deleteSubcategory = async (req, res) => {
    try {
        let subCat = await SubCategory.findById(req.params.id);

        if (!subCat) {
            console.log("SubCategory not found..");
            return res.redirect('/');
        }
        await SubCategory.findByIdAndDelete(req.params.id);
        return res.redirect('/subcategory/view-subcategory');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.editSubcategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.findById(req.params.id);
        const categories = await Category.find();
        res.render('subcategory/editSubcategory', { subcategory, categories });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.updateSubcategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                categoryId: req.body.categoryId,
                subCategoryName: req.body.subCategoryName
            },
            { new: true }
        );

        res.redirect('/subcategory/view-subcategory');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};