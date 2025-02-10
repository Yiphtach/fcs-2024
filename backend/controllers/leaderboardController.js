const Character = require('../models/characterModel');

// 🎖 Get Top Ranked Characters
exports.getLeaderboard = async (req, res) => {
  try {
      const topCharacters = await Character.find()
          .sort({ wins: -1, totalFights: -1 }) // Sort by most wins, then by total fights
          .limit(10); // Retrieve the top 10 fighters

      res.json({ message: "Leaderboard retrieved successfully!", leaderboard: topCharacters });
  } catch (error) {
      console.error('Error retrieving leaderboard:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 📈 Get Win/Loss Ratio of a Specific Character
exports.getCharacterStats = async (req, res) => {
  try {
      const { id } = req.params;
      const character = await Character.findById(id);

      if (!character) {
          return res.status(404).json({ error: 'Character not found.' });
      }

      res.json({
          name: character.name,
          wins: character.wins,
          losses: character.losses,
          totalFights: character.totalFights,
          winRatio: character.winRatio,
          lossRatio: character.lossRatio
      });

  } catch (error) {
      console.error('Error fetching character stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 🔄 Update Leaderboard Stats After a Fight
exports.updateCharacterRecords = async (winnerId, loserId) => {
  try {
      const winner = await Character.findById(winnerId);
      const loser = await Character.findById(loserId);

      if (!winner || !loser) {
          console.log("One or both characters not found, skipping leaderboard update.");
          return;
      }

      // Update records
      winner.wins += 1;
      winner.totalFights += 1;
      await winner.save();

      loser.losses += 1;
      loser.totalFights += 1;
      await loser.save();

      console.log(`✅ Leaderboard updated: ${winner.name} wins, ${loser.name} loses.`);
  } catch (error) {
      console.error('Error updating character records:', error);
  }
};


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
