const Movie = require('../model/movie.model');
const fs = require('fs');
const path = require('path');

exports.index = async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
};

exports.movielist = async (req, res) => {
    const movies = await Movie.find();
    res.render('listmovie', { movies });
};

exports.addmovie = async (req, res) => {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    await Movie.create({
        ...req.body,
        movieImg: imagePath
    });

    res.redirect('/add');
};

exports.editmovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('edit', { movie });
};

exports.updatemovie = async (req, res) => {

    const movie = await Movie.findById(req.params.id);
    let imagepath = movie.movieImg;

    if (req.file) {

        if (movie.movieImg) {
            const oldPath = path.join(__dirname, '..', movie.movieImg);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        imagepath = `/uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(req.params.id, {
        ...req.body,
        movieImg: imagepath
    });

    res.redirect('/add');
};

exports.deletemovie = async (req, res) => {

    const movie = await Movie.findById(req.params.id);

    if (movie.movieImg) {
        const imgPath = path.join(__dirname, '..', movie.movieImg);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/add');
};
