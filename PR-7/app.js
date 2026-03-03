const express = require('express');
const session = require('express-session');
const flash = require('connect-flash'); // ✅ add flash
const port = 8080;
const app = express();

const db = require('./config/db');
db();

const blogRoutes = require('./routes/blog.routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/uploads", express.static("uploads"));

// ================= LOGIN ATTEMPT TRACKER =================
const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// ================= SESSION & FLASH =================
app.use(session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(flash()); // ✅ initialize flash

// ================= GLOBAL VARIABLES FOR FLASH =================
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// ================= AUTH MIDDLEWARE =================
function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// ================= LOGIN =================
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { messages: req.flash() });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // ================= VALIDATION =================
    // Check empty fields
    if (!email || !password) {
        req.flash('error', 'Please enter email and password');
        return res.redirect('/login');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        req.flash('error', 'Please enter a valid email address');
        return res.redirect('/login');
    }
    
    // Check password minimum length
    if (password.length < 6) {
        req.flash('error', 'Password must be at least 6 characters');
        return res.redirect('/login');
    }
    
    // ================= ACCOUNT LOCKOUT CHECK =================
    if (loginAttempts[email]) {
        const currentTime = Date.now();
        const attemptData = loginAttempts[email];
        
        // Check if account is locked
        if (attemptData.lockedUntil && currentTime < attemptData.lockedUntil) {
            const remainingTime = Math.ceil((attemptData.lockedUntil - currentTime) / 1000 / 60);
            req.flash('error', `Account locked. Try again in ${remainingTime} minute(s)`);
            return res.redirect('/login');
        }
        
        // Reset lockout if time has passed
        if (attemptData.lockedUntil && currentTime >= attemptData.lockedUntil) {
            delete loginAttempts[email];
        }
    }
    
    // ================= LOGIN LOGIC =================
    // For demo: check email and password
    // In production, you would verify against database with bcrypt
    if (email && password) {
        // Reset attempt counter on successful login
        if (loginAttempts[email]) {
            delete loginAttempts[email];
        }
        
        req.session.user = email;
        req.session.save((err) => {
            if (err) {
                console.log('Session save error:', err);
                return res.redirect('/login');
            }
            req.flash('success', 'Login Success!');
            res.redirect('/dashboard');
        });
    } else {
        // ================= FAILED ATTEMPT TRACKING =================
        if (!loginAttempts[email]) {
            loginAttempts[email] = {
                attempts: 1,
                firstAttempt: Date.now()
            };
        } else {
            loginAttempts[email].attempts++;
        }
        
        const { attempts } = loginAttempts[email];
        
        // Lock account after MAX_ATTEMPTS
        if (attempts >= MAX_ATTEMPTS) {
            loginAttempts[email].lockedUntil = Date.now() + LOCKOUT_TIME;
            req.flash('error', `Too many failed attempts! Account locked for 15 minutes`);
            return res.redirect('/login');
        }
        
        // Show remaining attempts
        const remainingAttempts = MAX_ATTEMPTS - attempts;
        req.flash('error', `Invalid credentials. ${remainingAttempts} attempt(s) remaining`);
        res.redirect('/login');
    }
});

// ================= DASHBOARD =================
app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

// ================= BLOG ROUTES =================
app.use('/blog', checkAuth, blogRoutes);

// ================= CHANGE PASSWORD PAGE =================
app.get('/change-password', checkAuth, (req, res) => {
    res.render('changePassword', { messages: req.flash() });
});

// ================= CHANGE PASSWORD LOGIC =================
app.post('/change-password', checkAuth, (req, res) => {
    const { curPassword, newPassword, conPassword } = req.body;

    // Demo: since DB login nahi hai
    if (!curPassword || !newPassword || !conPassword) {
        req.flash('error', 'Please fill all fields');
        return res.redirect('/change-password');
    }

    if (newPassword !== conPassword) {
        req.flash('error', 'New password and confirm password do not match');
        return res.redirect('/change-password');
    }

    // Normally yaha DB me password update hota
    console.log("Password Changed Successfully");
    req.flash('success', 'Password changed successfully!');
    res.redirect('/dashboard');
});

// ================= LOGOUT =================
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// ================= SERVER START =================
app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});