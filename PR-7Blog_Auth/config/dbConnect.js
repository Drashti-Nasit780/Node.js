
const mongoose = require('mongoose');

const dbConnect = () => {
      mongoose.connect('mongodb://drashti780:Drashti%40nasit@ac-kxb9ozn-shard-00-00.dcsjbsf.mongodb.net:27017,ac-kxb9ozn-shard-00-01.dcsjbsf.mongodb.net:27017,ac-kxb9ozn-shard-00-02.dcsjbsf.mongodb.net:27017/PR-7E?ssl=true&replicaSet=atlas-6194t7-shard-0&authSource=admin&appName=Cluster0')
            .then(() => console.log("Db connected..!"))
            .catch((err) => console.log(err));
};

module.exports = dbConnect;