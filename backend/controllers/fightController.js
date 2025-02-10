const mongoose = require('mongoose');
const Character = require('../models/characterModel');
const Fight = require('../models/fightModel');
const leaderboardController = require('../controllers/leaderboardController');

// ✅ Simulate a Fight
exports.simulateFight = async (req, res) => {
  try {
    const { char1Id, char2Id } = req.body;

    // ✅ Validate character selection
    if (!char1Id || !char2Id) {
      return res.status(400).json({ error: 'Missing character IDs.' });
    }

    // ✅ Validate MongoDB ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(char1Id) || !mongoose.Types.ObjectId.isValid(char2Id)) {
      return res.status(400).json({ error: 'Invalid Character IDs.' });
    }

    const char1 = await Character.findById(char1Id);
    const char2 = await Character.findById(char2Id);

    if (!char1 || !char2) {
      return res.status(404).json({ error: 'One or both characters not found.' });
    }

    // ✅ Simulate the fight
    const fightResult = dynamicFightSimulation(char1, char2);

    if (!fightResult.winner || !fightResult.loser) {
      return res.status(200).json({ message: "It's a tie!", fightLog: fightResult.log });
    }

    // ✅ Update character stats
    await updateCharacterStats(fightResult.winner, fightResult.loser);

    // ✅ Log the fight
    await logFightHistory(fightResult.winner, fightResult.loser, fightResult.log, fightResult.stats);

    // ✅ Update leaderboard
    await leaderboardController.updateCharacterRecords(fightResult.winner._id, fightResult.loser._id);

    // ✅ Return the fight result
    res.json({
      message: `${fightResult.winner.name} won the fight!`,
      fightLog: fightResult.log,
      fightStats: fightResult.stats,
      winner: fightResult.winner.name,
      loser: fightResult.loser.name
    });

  } catch (error) {
    console.error('Error during fight simulation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Dynamic Fight Simulation Logic
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
    winnerLuckFactor: Math.floor(Math.random() * 5) + 1, // Random 1-5
    loserLuckFactor: Math.floor(Math.random() * 5) + 1,
  };

  while (char1Health > 0 && char2Health > 0) {
    const char1Attack = calculateAttack(char1, char2);
    const char2Attack = calculateAttack(char2, char1);

    char2Health -= char1Attack.damage;
    fightStats.winnerDamageDealt += char1Attack.damage;
    fightLog.push(`Round ${round}: ${char1.name} uses ${char1Attack.move}, dealing ${char1Attack.damage} damage.`);

    if (char2Health <= 0) {
      fightLog.push(`${char2.name} is knocked out!`);
      fightStats.totalRounds = round;
      return { winner: char1, loser: char2, log: fightLog, stats: fightStats };
    }

    char1Health -= char2Attack.damage;
    fightStats.loserDamageDealt += char2Attack.damage;
    fightLog.push(`Round ${round}: ${char2.name} counters with ${char2Attack.move}, dealing ${char2Attack.damage} damage.`);

    if (char1Health <= 0) {
      fightLog.push(`${char1.name} is knocked out!`);
      fightStats.totalRounds = round;
      return { winner: char2, loser: char1, log: fightLog, stats: fightStats };
    }

    round++;
  }

  return { result: 'It\'s a tie!', log: fightLog, stats: fightStats };
}

// ✅ Calculate Attack with Randomized Factors
function calculateAttack(attacker, defender) {
  const attackStrength = attacker.stats.strength * (Math.random() + 0.5);
  const defense = defender.stats.durability * Math.random();

  const agilityAdvantage = attacker.stats.speed > defender.stats.speed ? 1.2 : 0.8;
  const luckFactor = Math.random() > 0.5 ? 1.2 : 0.8;
  const isCriticalHit = Math.random() < (attacker.stats.intelligence / 100);

  const move = isCriticalHit ? 'Critical Strike' : attacker.specialAbility || 'Basic Attack';
  const damage = Math.max((attackStrength * agilityAdvantage * luckFactor) - defense, 0);

  return { move, damage: Math.round(damage) };
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

// ✅ Log Fight History
async function logFightHistory(winner, loser, log, fightStats) {
  try {
    const fight = new Fight({
      winner: winner._id,
      loser: loser._id,
      fightLog: log,
      totalRounds: fightStats.totalRounds,
      winnerDamageDealt: fightStats.winnerDamageDealt,
      loserDamageDealt: fightStats.loserDamageDealt,
      winnerSpecialMoveUsed: fightStats.winnerSpecialMoveUsed || 'None',
      loserSpecialMoveUsed: fightStats.loserSpecialMoveUsed || 'None',
      winnerLuckFactor: fightStats.winnerLuckFactor || 1,
      loserLuckFactor: fightStats.loserLuckFactor || 1,
      date: new Date(),
    });

    await fight.save();
    console.log(`✅ Fight logged: ${winner.name} vs ${loser.name}`);
  } catch (error) {
    console.error('❌ Error logging fight history:', error);
  }
}
