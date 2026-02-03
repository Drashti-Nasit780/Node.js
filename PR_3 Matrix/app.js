const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/charts', (req, res) => {
    res.render('charts');
});

app.get('/widgets', (req, res) => {
    res.render('widgets');
});

app.listen(8080, ()=>{
    console.log("Server start on http://localhost:8080");
})