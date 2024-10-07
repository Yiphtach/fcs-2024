// routes/fights.js
const express = require('express');
const router = express.Router();
const fightController = require('../controllers/fightController');

// GET: Display fight setup page
router.get('/', fightController.showFightSetup);

// POST: Simulate a fight
router.post('/simulate', fightController.simulateFight);

module.exports = router;
