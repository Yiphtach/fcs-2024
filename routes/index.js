const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('index');  // Render the 'index.ejs' view
});

// You can add more routes here as needed
// For example, if you want to add an about page
router.get('/about', (req, res) => {
    res.render('about');  // Render the 'about.ejs' view
});

module.exports = router;
