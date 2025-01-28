const Character = require('../models/character');

// Display leaderboard: characters ranked by wins, then by win ratio
exports.showLeaderboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = 30;  // Show 30 characters per page
    const skip = (page - 1) * limit;

    // Fetch characters sorted by wins, win ratio, and total fights with pagination
    const characters = await Character.find()
      .sort({ wins: -1, winRatio: -1, totalFights: -1 })  // Sort by wins, win ratio, and total fights
      .select('name universe wins losses totalFights winRatio')  // Fetch necessary fields, including win ratio
      .skip(skip)
      .limit(limit);

    const totalCharacters = await Character.countDocuments();  // Get total number of characters for pagination

    // Render the leaderboard with pagination
    res.render('leaderboards', {
      title: 'Leaderboard',
      characters,
      currentPage: page,
      totalPages: Math.ceil(totalCharacters / limit),
    });
  } catch (error) {
    console.error('Error displaying leaderboard:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Display a character's details on the leaderboard
exports.showCharacterDetails = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
      .select('name universe stats wins losses totalFights imageUrl');  // Fetch necessary fields

    if (!character) {
      return res.status(404).send('Character not found');
    }

    res.render('characterDetails', { title: `${character.name} Details`, character });
  } catch (error) {
    console.error('Error displaying character details:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
