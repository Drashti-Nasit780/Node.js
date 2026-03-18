const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport')
const localStrategy = require('./middleware/localStrategy.js')
const session = require('express-session');
const dbConnect = require('./config/dbConnect.js')

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(session({
    name: 'web',
    secret: 'demo',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticate);

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use('/', require('./routes/index.routes.js'));

app.listen(8010, () => {
    console.log(`Server start at http://localhost:8010`);
});