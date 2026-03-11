const express = require("express");
const port = 8080;

const app = express();
const dbConnect = require('./config/dbConnect');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("./middleware/localStrategy");
const session = require('express-session');
const flash = require('connect-flash'); // add this

// dbConnection
dbConnect();

//middleware
app.set("view engine", 'ejs');
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use("/uploads", express.static("uploads"));

app.use(session({
    name:'web-developement',
    secret: 'demo',
    saveUninitialized:false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.use(flash()); // add this

app.use((req,res,next)=>{
    res.locals.messages = req.flash();
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticate)

// routes
app.use("/", require('./routes/index.routes'));

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});