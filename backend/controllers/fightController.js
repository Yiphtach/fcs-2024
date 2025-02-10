const Character = require('../models/characterModel');
const Fight = require('../models/fightModel'); 
const leaderboardController = require('../controllers/leaderboardController');
const mongoose = require('mongoose');

// Display fight setup form (Choose Universe)
exports.showFightSetup = async (req, res) => {
  try {
    const universes = ['Marvel', 'DC', 'Other'];  // Universes to choose from
    res.render('fightSetup', { universes, title: 'Choose Your Universe' });
  } catch (error) {
    console.error('Error fetching universes:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Display the character gallery for fight selection
exports.showCharacterGallery = async (req, res) => {
  try {
    const characters = await Character.find({});  // Fetch all characters
    res.render('gallery', { title: 'Character Gallery', characters });
  } catch (error) {
    console.error('Error fetching characters for gallery:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Show character selection after universe selection
exports.showCharacterSelection = async (req, res) => {
  try {
    const { universe } = req.query;  // Get the selected universe from the query string
    const characters = await Character.find({ universe });  // Fetch characters from the selected universe
    res.render('characterSelection', { characters, universe, title: 'Choose Your Character' });
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Simulate a fight between two characters
exports.simulateFight = async (req, res) => {
  try {
    const { char1Id, char2Id } = req.body;

    // Validate character selection
    if (!char1Id || !char2Id) {
      return res.status(400).send('Bad Request: Missing character IDs.');
    }

    // Check for valid MongoDB ObjectIDs
    if (!char1Id.match(/^[0-9a-fA-F]{24}$/) || !char2Id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send('Bad Request: Invalid Character IDs.');
    }

    const char1 = await Character.findById(char1Id);
    const char2 = await Character.findById(char2Id);

    if (!char1 || !char2) {
      return res.status(404).send('Character not found.');
    }

    // Simulate the fight
    const fightResult = dynamicFightSimulation(char1, char2);

    // Update character stats
    await updateCharacterStats(fightResult.winner, fightResult.loser);

    // Log the fight
    await logFightHistory(fightResult.winner, fightResult.loser, fightResult.log, fightResult.stats);

    // ✅ Update leaderboard
    await leaderboardController.updateCharacterRecords(fightResult.winner._id, fightResult.loser._id);

    // Pass the fight result, health, and fight log to the template
    res.render('fightResult', {
      title: 'Fight Result',
      char1,
      char2,
      char1Health: fightResult.char1Health,
      char2Health: fightResult.char2Health,
      fightResult
    });
  } catch (error) {
    console.error('Error during fight simulation:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Dynamic fight simulation logic with balancing and luck
function dynamicFightSimulation(char1, char2) {
  let char1Health = 100;
  let char2Health = 100;
  const fightLog = [];
  let round = 1;

  const fightStats = {
    totalRounds: 0,
    winnerDamageDealt: 0,
    loserDamageDealt: 0,
    winnerSpecialMoveUsed: '',
    loserSpecialMoveUsed: '',
    winnerLuckFactor: 1,
    loserLuckFactor: 1,
  };

  while (char1Health > 0 && char2Health > 0) {
    const char1Attack = calculateAttack(char1, char2);
    const char2Attack = calculateAttack(char2, char1);

    char2Health -= char1Attack.damage;
    fightLog.push(`Round ${round}: ${char1.name} attacks with ${char1Attack.move}, causing ${char1Attack.damage} damage.`);
    fightStats.winnerDamageDealt += char1Attack.damage;

    if (char2Health <= 0) {
      fightLog.push(`${char2.name} is defeated!`);
      fightStats.totalRounds = round;
      return {
        winner: char1,
        loser: char2,
        log: fightLog,
        stats: fightStats,
        char1Health,
        char2Health
      };
    }

    char1Health -= char2Attack.damage;
    fightLog.push(`Round ${round}: ${char2.name} counters with ${char2Attack.move}, causing ${char2Attack.damage} damage.`);
    fightStats.loserDamageDealt += char2Attack.damage;

    if (char1Health <= 0) {
      fightLog.push(`${char1.name} is defeated!`);
      fightStats.totalRounds = round;
      return {
        winner: char2,
        loser: char1,
        log: fightLog,
        stats: fightStats,
        char1Health,
        char2Health
      };
    }

    round++;
  }

  return { result: 'It\'s a tie!', log: fightLog, stats: fightStats, char1Health, char2Health };
}

// Calculate attack with luck and special abilities
function calculateAttack(attacker, defender) {
  const attackStrength = attacker.stats.strength * Math.random();
  const defense = defender.stats.durability * Math.random();

  const luckFactor = Math.random() > 0.5 ? 1.2 : 0.8;
  const agilityAdvantage = attacker.stats.speed > defender.stats.speed ? 1.2 : 0.8;

  const isCriticalHit = Math.random() < (attacker.stats.intelligence / 100);
  const move = isCriticalHit ? 'Critical Hit' : attacker.specialAbility || 'Normal Attack';

  const damage = Math.max((attackStrength * agilityAdvantage * luckFactor) - defense, 0);

  return { move, damage };
}

// ✅ Update Character Stats After a Fight
async function updateCharacterStats(winner, loser) {
  try {
    const updatedWinner = await Character.findByIdAndUpdate(
      winner._id,
      { $inc: { wins: 1, totalFights: 1 } },
      { new: true }
    );

    const updatedLoser = await Character.findByIdAndUpdate(
      loser._id,
      { $inc: { losses: 1, totalFights: 1 } },
      { new: true }
    );

    return { updatedWinner, updatedLoser };

  } catch (error) {
    console.error('Error updating character stats:', error);
  }
}

// Log fight history
async function logFightHistory(winner, loser, log, fightStats) {
  try {
    const fight = new Fight({
      winner: winner._id,
      loser: loser._id,
      fightLog: log,
      totalRounds: fightStats.totalRounds,
      winnerDamageDealt: fightStats.winnerDamageDealt,
      loserDamageDealt: fightStats.loserDamageDealt,
      winnerSpecialMoveUsed: fightStats.winnerSpecialMoveUsed || '',
      loserSpecialMoveUsed: fightStats.loserSpecialMoveUsed || '',
      winnerLuckFactor: fightStats.winnerLuckFactor || 1,
      loserLuckFactor: fightStats.loserLuckFactor || 1,
      date: new Date(),
    });
    await fight.save();
    console.log(`Fight logged: ${winner.name} vs ${loser.name}`);
  } catch (error) {
    console.error('Error logging fight history:', error);
  }
}