const express = require('express');
const router = express.Router();
const fightController = require('../controllers/fightController');

// Middleware to validate the request for fight simulation
const validateFightInput = (req, res, next) => {
    const { char1Id, char2Id } = req.body;

    // Ensure both character IDs are present and valid MongoDB ObjectIDs
    if (!char1Id || !char2Id) {
        return res.status(400).send('Bad Request: Both character IDs are required.');
    }

    const isValidObjectId = /^[0-9a-fA-F]{24}$/;  // Basic regex to check for valid MongoDB ObjectId
    if (!char1Id.match(isValidObjectId) || !char2Id.match(isValidObjectId)) {
        return res.status(400).send('Invalid Character ID(s)');
    }

    next();
};

// Route to display universe selection page
router.get('/setup', fightController.showFightSetup);

// Route to display character selection page based on chosen universe
router.get('/selectCharacter', fightController.showCharacterSelection);

// GET: Show the initial fight setup page
router.get('/', (req, res) => {
    try {
        fightController.showFightSetup(req, res);
    } catch (error) {
        console.error('Error showing fight setup page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST: Simulate fight after characters are selected
router.post('/simulate', validateFightInput, (req, res) => {
    try {
        fightController.simulateFight(req, res);
    } catch (error) {
        console.error('Error simulating fight:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
