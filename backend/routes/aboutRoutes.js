const express = require('express');

const router = express.Router();

// GET route for about page
router.get('/', (req, res) => {
    res.json({
        message: 'About page information',
        version: '1.0.0',
        description: 'FCS 2024 Backend API'
    });
});

module.exports = router;