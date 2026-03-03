const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    loginPage,
    login,
    dashboardPage,
    logOutAdmin,
    myProfile,
    changePasswordPage,
    changePassword
} = require('../controller/index.controller');

// Auth Middleware
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

// Login Page
router.get('/', loginPage);

// Login
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    login
);

// Dashboard
router.get('/dashboard', checkAuth, dashboardPage);

// Logout
router.get('/logout', logOutAdmin);

// Profile
router.get('/my-profile', checkAuth, myProfile);

// Change Password
router.get('/change-password', checkAuth, changePasswordPage);
router.post('/change-password', checkAuth, changePassword);

module.exports = router;