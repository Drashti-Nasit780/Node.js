const express = require('express');
const movie = require('../controller/index.controller');
const upload = require('../middleware/imageUploads')
const { uploadImage } = require('../middleware/imageUploads');

const router = express.Router();
router.get('/', movie.index);
router.get('/add', movie.movielist)
router.post('/add-movie', uploadImage.single('movieImg'), movie.addmovie);
router.get('/edit-movie/:id', movie.editmovie);
router.post('/update-movie/:id', uploadImage.single('movieImg'), movie.updatemovie);
router.get('/delete-movie/:id', movie.deletemovie);

module.exports = router;                                                                                    