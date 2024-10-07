// routes/characters.js
const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// GET: List all characters
router.get('/', characterController.listCharacters);

// GET: Display form to create a new character
router.get('/new', characterController.showCreateForm);

// POST: Create a new character
router.post('/', characterController.createCharacter);

// GET: Display form to edit an existing character
router.get('/:id/edit', characterController.showEditForm);

// PUT: Update an existing character
router.put('/:id', characterController.updateCharacter);

// DELETE: Delete a character
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;
