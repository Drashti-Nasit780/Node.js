const Category = require('../model/category.model');
const SubCategory = require('../model/subCategory.model');
const ExtraCategory = require('../model/extraCategory.model');

exports.getExtracategory = async (req, res) => {
    try {
        const { subCategoryId } = req.query;
        const extraCategories = await ExtraCategory.find({ subCategoryId: subCategoryId });
        res.json(extraCategories);

    } catch (error) {
        console.log(error);
        res.json('/');
    }
};

exports.addExtraCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('extracategory/addExtraCategory', { categories });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.addExtraCategory = async (req, res) => {
    try {
        await ExtraCategory.create(req.body);
        res.redirect('/extracategory/view-extracategory');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.viewExtraCategory = async (req, res) => {
    try {
        const extracategories = await ExtraCategory.find()
            .populate({
                path: 'subCategoryId',
                populate: {
                    path: 'categoryId'
                }
            });
        res.render('extracategory/viewExtraCategory', { extracategories });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.deleteExtraCategory = async (req, res) => {
    try {
        await ExtraCategory.findByIdAndDelete(req.params.id);
        res.redirect('/extracategory/view-extracategory');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};
exports.editExtraCategory = async (req, res) => {
    try {
        const extracategory = await ExtraCategory
            .findById(req.params.id)
            .populate({
                path: 'subCategoryId',
                populate: {
                    path: 'categoryId'
                }
            });

        const categories = await Category.find();
        const subcategories = await SubCategory.find();

        res.render('extracategory/editExtraCategory', { extracategory, categories, subcategories });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.updateExtraCategory = async (req, res) => {
    try {
        await ExtraCategory.findByIdAndUpdate(
            req.params.id,
            {
                subCategoryId: req.body.subCategoryId,
                extraCategoryName: req.body.extraCategoryName
            }
        );

        res.redirect('/extracategory/view-extracategory');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};