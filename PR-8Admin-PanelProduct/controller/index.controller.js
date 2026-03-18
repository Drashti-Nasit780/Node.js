const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');

exports.logInPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard")
        } else
            return res.render("logIn");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.logIn = async (req, res) => {
    try {
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
}

exports.dashboardPage = async (req, res) => {
    try {
        return res.render("dashboard");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};


exports.myProfile = async (req, res) => {
    try {
        return res.render("myProfile", { user: req.user });
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.changePasswordPage = async (req, res) => {
    try {
        return res.render("changePassword");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { curPass, newPass, conPass } = req.body;
        const user = req.user;
        let verifyPass = await bcrypt.compare(curPass, user.password);
        if (!verifyPass) {
            return res.redirect("/change-password");
        }
        if (curPass == newPass) {
            return res.redirect("/change-password");
        }
        if (newPass != conPass) {
            return res.redirect("/change-password");
        }

        let hashPass = await bcrypt.hash(newPass, 10);
        await Admin.findByIdAndUpdate(user._id, { password: hashPass }, { new: true });
        return res.redirect("/");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err, data) => {
            if (err) console.log(err)
            else {
                return res.redirect("/");
            }
        })
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }        
};