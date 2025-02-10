const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();



// Middleware to validate MongoDB ObjectID for character routes with ':id'
const validateCharacterId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid MongoDB Character ID');
    }
    next();
};

// 📝 GET: List all characters
router.get('/', characterController.listCharacters);

// 📝 GET: View a specific character's details from MongoDB
router.get('/:id', validateCharacterId, characterController.showCharacterDetails);

// 🆕 GET: Display form to create a new character
router.get('/new', (req, res) => {
    res.render('characterForm', { title: 'Create New Character' });
});

// 🚀 POST: Create a new character
router.post('/', characterController.createCharacter);

// 🛠️ GET: Display form to edit an existing character
router.get('/:id/edit', validateCharacterId, characterController.showEditForm);

// 🔄 PUT: Update an existing character
router.put('/:id', validateCharacterId, characterController.updateCharacter);

// ❌ DELETE: Delete a character
router.delete('/:id', validateCharacterId, characterController.deleteCharacter);

module.exports = router;