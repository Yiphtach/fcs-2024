const express = require('express');
const router = express.Router();
const Character = require('../models/characterModel');
const leaderboardController = require('../controllers/leaderboardController');

// 🏆 GET: Retrieve the leaderboard (top 10 ranked characters)
router.get('/', leaderboardController.getLeaderboard);

// 📊 GET: Retrieve win/loss stats for a specific character
router.get('/:id', leaderboardController.getCharacterStats);

// Route for the leaderboard page
router.get('/leaderboard', leaderboardController.showLeaderboard);

// Route for viewing character details
router.get('/leaderboard/:id', leaderboardController.showCharacterDetails);

// GET: Display the leaderboard with pagination and navigation buttons
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = 30;  // Show 30 characters per page
    const skip = (page - 1) * limit;

    // Fetch characters with pagination and sorting by wins and losses
    const characters = await Character.find({}, 'name universe wins losses totalFights')
                                      .sort({ wins: -1, losses: 1 })  // Sort by most wins and fewest losses
                                      .skip(skip)
                                      .limit(limit);

    // Fetch total character count for pagination
    const totalCharacters = await Character.countDocuments();
    const totalPages = Math.ceil(totalCharacters / limit);

    // Render leaderboard with pagination and navigation buttons
    res.render('leaderboards', {
      title: 'Leaderboard',
      characters,
      currentPage: page,  // Pass current page for pagination
      totalPages,  // Total number of pages
      buttons: [
        { label: 'Home', link: '/' },
        { label: 'Simulate Fight', link: '/fights' },
        { label: 'View All Characters', link: '/characters' },
      ]
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
