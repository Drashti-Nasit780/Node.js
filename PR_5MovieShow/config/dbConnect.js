const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb+srv://drashti780:Drashti%40nasit@cluster0.dcsjbsf.mongodb.net/moviePr")
   // mongoose.connect("mongodb://localhost:27017/MovieShow")
        .then(() => console.log("DB is Connected"))
        .catch((err) => console.log(err));
}

module.exports = dbConnect;
