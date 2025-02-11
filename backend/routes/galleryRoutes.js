const express = require('express');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// GET all gallery items
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Get all gallery items' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single gallery item
router.get('/:id', (req, res) => {
    try {
        res.status(200).json({ message: `Get gallery item ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new gallery item
router.post('/', (req, res) => {
    try {
        res.status(201).json({ message: 'Create new gallery item' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE gallery item
router.delete('/:id', (req, res) => {
    try {
        res.status(200).json({ message: `Delete gallery item ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;