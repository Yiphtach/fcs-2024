const express = require('express');
const router = express.Router();

// Home Page Route
router.get('/', (req, res) => {
    try {
        res.render('index', { title: 'Home', buttons: [
            { label: 'Simulate a Fight', link: '/fights' },
            { label: 'View Characters', link: '/characters' },
            { label: 'Leaderboards', link: '/leaderboards' },
            { label: 'About', link: '/about' }
        ]});
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// About Page Route
router.get('/about', (req, res) => {
    try {
        res.render('about', { title: 'About', buttons: [
            { label: 'Home', link: '/' },
            { label: 'Simulate a Fight', link: '/fights' },
            { label: 'View Characters', link: '/characters' },
            { label: 'Leaderboards', link: '/leaderboards' }
        ]});
    } catch (error) {
        console.error('Error rendering about page:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
