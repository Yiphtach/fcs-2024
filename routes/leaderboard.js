const express = require('express');
const router = express.Router();
const Character = require('../models/character');

// GET: Display the leaderboard
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = 30;  // Show 30 characters per page
    const skip = (page - 1) * limit;

    // Fetch characters with pagination and sorting
    const characters = await Character.find({}, 'name wins losses')
                                      .sort({ wins: -1, losses: 1 })
                                      .skip(skip)
                                      .limit(limit);

    res.render('leaderboard', { title: 'Leaderboard', characters, page });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
