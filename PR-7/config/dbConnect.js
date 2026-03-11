
const mongoose = require('mongoose');

const dbConnect = () => {
      mongoose.connect('mongodb+srv://drashti780:Drashti%40nasit@cluster0.dcsjbsf.mongodb.net/pr-7')
      .then(() => console.log("Db connected..!"))
      .catch((err) => console.log(err));
};

module.exports = dbConnect;