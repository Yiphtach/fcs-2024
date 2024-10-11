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

// GET: List all characters
router.get('/', characterController.listCharacters);

// GET: Display form to create a new character
router.get('/new', characterController.showCreateForm);

// POST: Create a new character
router.post('/', characterController.createCharacter);

// GET: Display form to edit an existing character
router.get('/:id/edit', validateCharacterId, characterController.showEditForm);

// PUT: Update an existing character
router.put('/:id', validateCharacterId, characterController.updateCharacter);

// DELETE: Delete a character
router.delete('/:id', validateCharacterId, characterController.deleteCharacter);

module.exports = router;
