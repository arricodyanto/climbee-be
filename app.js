const express = require('express');
const colors = require('colors');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Impor data


// Initialize express
const app = express();
const port = 3000;

// Use EJS
app.set('view engine', 'ejs');

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third-party Middleware
app.use(expressLayouts);

// Routes
app.get('/', (req, res) => {
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

app.get('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</404>')
})

// Set-up
// if (process.env.NODE_ENV === "development") {
//     app.use(morgan('dev'));
// }

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`.yellow.bold)
})