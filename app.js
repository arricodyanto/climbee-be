const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize express
const app = express();
const port = 3000;

// Use EJS
app.set('view engine', 'ejs');

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Set-up
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`.yellow.bold)
})