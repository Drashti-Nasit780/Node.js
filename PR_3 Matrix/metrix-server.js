const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "matrix-admin",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function showLoginPage(req, res) {
    res.render("authentication-login");
}

function checkLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email === "admin@gmail.com" && password === "1234") {
        req.session.admin = true;
        res.redirect("/dashboard");
    } else {
        res.redirect("/");
    }
}

function showDashboard(req, res) {
    if (!req.session.admin) {
        return res.redirect("/");
    }
    res.render("index");
}

function showTablesPage(req, res) {
    if (!req.session.admin) {
        return res.redirect("/");
    }
    res.render("tables");
}

function logoutAdmin(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}
app.get("/", showLoginPage);
app.post("/login", checkLogin);
app.get("/dashboard", showDashboard);
app.get("/tables", showTablesPage);
app.get("/logout", logoutAdmin);

app.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
});
