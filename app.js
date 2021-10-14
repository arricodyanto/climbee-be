if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const colors = require('colors');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// Impor data
const users = []

// Initialize express
const app = express();

// Use EJS
app.set('view engine', 'ejs');

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Third-party Middleware
app.use(expressLayouts);
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Climbee - Fashion Store',
        active: 'active'
    })
})
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        layout: 'layouts/main-layout',
        title: 'Tentang Toko - Climbee',
        active: 'active'
    })
})
app.get('/produk', (req, res) => {
    res.render('produk', {
        layout: 'layouts/main-layout',
        title: 'Semua Produk - Climbee',
        active: 'active'
    })
})
app.get('/mostlove', (req, res) => {
    res.render('mostlove', {
        layout: 'layouts/main-layout',
        title: 'Most Love - Climbee',
        active: 'active'
    })
})
app.get('/pembayaran', (req, res) => {
    res.render('pembayaran', {
        layout: 'layouts/main-layout',
        title: 'Pembayaran - Climbee',
        active: 'active'
    })
})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', {
        layout: 'layouts/login-layout',
        title: 'Login'
    })
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register', {
        layout: 'layouts/login-layout',
        title: 'Register'
    })
})
app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.get('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</404>')
})

app.listen(process.env.PORT || 5000)