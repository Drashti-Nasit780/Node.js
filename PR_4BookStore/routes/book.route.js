const express = require('express');
const book = require('../controllers/book.controller');
const upload = require('../middleware/imageUploads')
const { uploadImage } = require('../middleware/imageUploads');

const router = express.Router();
router.get('/', book.index)
router.post('/add-book', uploadImage.single('bookImg'), book.addBook);
router.get('/edit-book/:id', book.editBook);
router.post('/update-book/:id', uploadImage.single('bookImg'), book.updateBook);
router.get('/delete-book/:id', book.deleteBook);

module.exports = router;