const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');

// ================= DASHBOARD =================
exports.dashboardPage = async (req, res) => {
    try {
        return res.render("dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= LOGOUT =================
exports.logOutAdmin = async (req, res) => {
    try {
        req.logout(function(err) {
            if (err) console.log(err);
            return res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= PROFILE =================
exports.myProfile = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/");
        return res.render("myProfile", { user: req.user });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= CHANGE PASSWORD =================
exports.changePasswordPage = async (req, res) => {
    try {
        return res.render("changePassword", { messages: req.flash() });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { curPassword, newPassword, conPassword } = req.body;
        const user = req.user;

        // Check current password
        const verifyPass = await bcrypt.compare(curPassword, user.password);
        if(!verifyPass){
            req.flash('error', 'Current password is incorrect.');
            return res.redirect("/change-password");
        }

        // Check new password != current
        if(curPassword === newPassword){
            req.flash('error', 'New password cannot be same as current password.');
            return res.redirect("/change-password");
        }

        // Check confirm password match
        if(newPassword !== conPassword){
            req.flash('error', 'New password and confirm password do not match.');
            return res.redirect("/change-password");
        }

        // Hash new password and update
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await Admin.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });

        req.flash('success', 'Password changed successfully!');
        return res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong.');
        return res.redirect("/change-password");
    }
};

// ================= LOGIN PAGE =================
exports.loginPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard");
        } else {
            return res.render("login", { messages: req.flash() });
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= LOGIN SUCCESS =================
exports.login = async (req, res) => {
    try {
        req.flash('success', 'Login Success!!!');
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};