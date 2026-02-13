const express = require('express');
const port = 8088;
const app = express();

app.use("/uploads", express.static("uploads"));     
const dbConnect = require('./config/dbConnect');

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/', require('./routes/index.routes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`)
});


