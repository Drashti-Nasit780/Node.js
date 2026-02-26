const express = require('express');
const port = 8080;
const app = express();

const db = require('./config/db');
db();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.render('dashboard');
});

const blogRoutes = require('./routes/blog.routes');
app.use('/blog', blogRoutes);

app.listen(port, ()=>{
    console.log(`Server start at http://localhost:${port}`);
})

