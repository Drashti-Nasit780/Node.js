const mongoose = require('mongoose');

const db = () => {
    mongoose.connect('mongodb+srv://drashti780:Drashti%40nasit@cluster0.dcsjbsf.mongodb.net/blog')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
};
module.exports = db;