const express = require('express');
const router = express.Router();
const fightController = require('../controllers/fightController');  // Make sure you have a valid controller

// GET: Show fight setup page
router.get('/', fightController.showFightSetup);

// POST: Simulate fight
router.post('/simulate', fightController.simulateFight);

module.exports = router;
