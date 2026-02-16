const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title:{
        type: String
    },
    genre:{
        type: String
    },
    description:{
        type: String
    },
    duration:{
        type: String
    },
    movieImg:{
        type: String
    }
});

module.exports = mongoose.model('movie', movieSchema);