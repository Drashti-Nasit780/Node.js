const Product = require("../model/product.model");
const Category = require('../model/category.model');
const Subcategories = require('../model/subCategory.model');
const Extracategories = require('../model/extraCategory.model');
const path = require('path');
const fs = require('fs');

exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('products/addProduct', { categories });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.addProduct = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : "";

        await Product.create({
            ...req.body,
            prodImg: imgPath
        });

        return res.redirect("/products/view-product");

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.viewProduct = async (req, res) => {
    try {
        let products = await Product.find()
            .populate("categoryId")
            .populate("subCategoryId")
            .populate("extracategoryId");

        return res.render('products/viewProduct', { products });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            console.log("Product not found");
            return res.redirect('/');
        }

        if (product.prodImg) {
            let imgPath = path.join(__dirname, "..", product.prodImg);

            try {
                fs.unlinkSync(imgPath);
            } catch (error) {
                console.log("Image file missing");
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        return res.redirect('/products/view-product');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.editProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        const categories = await Category.find();

        const subcategories = await Subcategories.find({
            categoryId: product.categoryId
        });

        const extracategories = await Extracategories.find({
            subCategoryId: product.subCategoryId
        });

        return res.render('products/editProduct', {
            product,
            categories,
            subcategories,
            extracategories
        });

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            console.log("Product not found");
            return res.redirect('/products/view-product');
        }

        const updateData = {
            prodName: req.body.prodName,
            prodDes: req.body.prodDes,
            prodPrice: req.body.prodPrice,
        };

        if (req.body.categoryId) {
            updateData.categoryId = req.body.categoryId;
        }

        if (req.body.subCategoryId) {
            updateData.subCategoryId = req.body.subCategoryId;
        }

        if (req.body.extracategoryId) {
            updateData.extracategoryId = req.body.extracategoryId;
        }

        if (req.file) {
            if (product.prodImg) {
                const imgPath = path.join(__dirname, "..", product.prodImg);

                try {
                    fs.unlinkSync(imgPath);
                } catch (err) {
                    console.log("Old image not found");
                }
            }

            updateData.prodImg = `/uploads/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(id, updateData, {
            returnDocument: 'after'
        });

        return res.redirect('/products/view-product');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};