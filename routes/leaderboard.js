// routes/leaderboard.js
const express = require('express');
const router = express.Router();
const Character = require('../models/character');

// GET: Display the leaderboard
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find().sort({ wins: -1, losses: 1 });  // Sort by most wins, fewest losses
    res.render('leaderboard', { characters });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
