const express = require('express');
const router = express.Router();

// Home Page Route
router.get('/', (req, res) => {
    try {
        res.render('index', { title: 'Home' });  // Render the home page with dynamic title
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// About Page Route
router.get('/about', (req, res) => {
    try {
        res.render('about', { title: 'About' });  // Render the about page with dynamic title
    } catch (error) {
        console.error('Error rendering about page:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
