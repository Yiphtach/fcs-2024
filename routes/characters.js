const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Middleware to validate MongoDB ObjectID for character routes with ':id'
const validateCharacterId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid Character ID');
    }
    next();
};

// GET: List all characters with navigation buttons
router.get('/', async (req, res) => {
    try {
        await characterController.listCharacters(req, res);
    } catch (error) {
        console.error('Error listing characters:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET: Display form to create a new character
router.get('/new', (req, res) => {
    try {
        res.render('characterForm', { title: 'Create New Character', buttons: [
            { label: 'Back to Characters', link: '/characters' },
            { label: 'Home', link: '/' }
        ]});
    } catch (error) {
        console.error('Error rendering character form:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST: Create a new character
router.post('/', characterController.createCharacter);

// GET: Display form to edit an existing character
router.get('/:id/edit', validateCharacterId, async (req, res) => {
    try {
        await characterController.showEditForm(req, res);
        res.render('characterForm', { title: 'Edit Character', buttons: [
            { label: 'Back to Characters', link: '/characters' },
            { label: 'Home', link: '/' }
        ]});
    } catch (error) {
        console.error('Error editing character:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT: Update an existing character
router.put('/:id', validateCharacterId, characterController.updateCharacter);

// DELETE: Delete a character
router.delete('/:id', validateCharacterId, characterController.deleteCharacter);

module.exports = router;
