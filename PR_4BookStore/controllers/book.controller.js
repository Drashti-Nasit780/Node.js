const Book = require('../model/book.model');
const fs = require('fs');
const path = require('path');

exports.index = async (req, res) => {
    try {
        const books = await Book.find();


        return res.render('index', { books });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.addBook = async (req, res) => {
    try {
        let imagePath = req.file ? `/uploads/${req.file.filename}` : '';
        let book = await Book.create({
            ...req.body,
            bookImg: imagePath
        })
        res.redirect('/');

    } catch (error) {
        consolw.log(error);
        res.redirect('/');
    }
};

exports.deleteBook = async (req, res) => {
    let id = req.params.id;
    let book = await Book.findById(id);

    if (!book) {
        console.log("Book not found..");
        return res.redirect('/');
    }

    if (book.bookImg != "") {
        let imagePath = path.join(__dirname, "..", book.bookImg);
        try {
            fs.unlinkSync(imagePath);
        } catch (error) {
            console.log('File is missing');
        }
    }
    await Book.findByIdAndDelete(id);
    return res.redirect('/');
};

exports.editBook = async (req, res) => {
    let book = await Book.findById(req.params.id);
    if (!book) {
        console.log("Book not found...");
        return res.redirect('/');
    }
    return res.render('edit', { book });
}

exports.updateBook = async (req, res) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
        console.log('Book is not found...')
        return res.redirect('/');
    }
    let imagepath;
    if (req.file) {
        if (book.bookImg != "") {
            imagepath = path.join(__dirname, '..', book.bookImg);
            try {
                fs.unlinkSync(imagepath);
            } catch {
                console.log('file missing');
            }
        }
        imagepath = `/uploads/${req.file.filename}`;
    } else {
        imagepath = book.bookImg;
    }
    book = await Book.findByIdAndUpdate(book._id, { ...req.body, bookImg: imagepath },
        { new: true });
    return res.redirect('/');
}