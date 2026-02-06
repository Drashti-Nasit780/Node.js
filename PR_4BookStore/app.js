const express = require('express');
const port = 8080;
const app = express();
const dbConnect = require('./config/dbConnect');

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
app.use('/', require('./routes/book.route'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`)
});