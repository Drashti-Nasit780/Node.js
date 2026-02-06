const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    title:{
        type: String
    },
    category:{
        type: String
    },
    pages:{
        type: String
    },
    price:{
        type: String
    },
    bookImg:{
        type: String
    }
});

module.exports = mongoose.model('Book', bookSchema);