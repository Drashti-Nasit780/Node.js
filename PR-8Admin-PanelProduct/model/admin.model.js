const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    mobileNo: String,
    profileimg: String
});

module.exports = mongoose.model('Admin', adminSchema);