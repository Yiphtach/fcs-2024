// controllers/fightController.js

// Simulate a fight
exports.simulateFight = async (req, res) => {
    try {
      const { char1Id, char2Id } = req.body;
      const char1 = await Character.findById(char1Id);
      const char2 = await Character.findById(char2Id);
  
      const fightResult = dynamicFightSimulation(char1, char2);
  
      res.render('fightResult', { char1, char2, fightResult });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // controllers/fightController.js

// Dynamic fight simulation logic (updated)
function dynamicFightSimulation(char1, char2) {
    let char1Health = 100;
    let char2Health = 100;
    const fightLog = [];
    let round = 1;
  
    while (char1Health > 0 && char2Health > 0) {
      const char1Attack = calculateAttack(char1, char2);
      const char2Attack = calculateAttack(char2, char1);
  
      char2Health -= char1Attack.damage;
      fightLog.push(`Round ${round}: ${char1.name} attacks with ${char1Attack.move} causing ${char1Attack.damage} damage.`);
  
      if (char2Health <= 0) {
        fightLog.push(`${char2.name} is defeated!`);
        char1.wins++;
        char2.losses++;
        char1.totalFights++;
        char2.totalFights++;
        char1.save();  // Update stats in the database
        char2.save();
        return {
          winner: char1.name,
          rounds: round,
          log: fightLog
        };
      }
  
      char1Health -= char2Attack.damage;
      fightLog.push(`Round ${round}: ${char2.name} counters with ${char2Attack.move} causing ${char2Attack.damage} damage.`);
  
      if (char1Health <= 0) {
        fightLog.push(`${char1.name} is defeated!`);
        char2.wins++;
        char1.losses++;
        char1.totalFights++;
        char2.totalFights++;
        char1.save();
        char2.save();
        return {
          winner: char2.name,
          rounds: round,
          log: fightLog
        };
      }
  
      round++;
    }
  
    return {
      result: 'It\'s a tie!',
      rounds: round,
      log: fightLog
    };
  }
  
  
  // Calculate damage and moves based on stats
  function calculateAttack(attacker, defender) {
    const attackStrength = attacker.stats.strength * Math.random();  // Strength-based damage
    const defense = defender.stats.durability * Math.random();  // Durability to mitigate damage
  
    const agilityAdvantage = attacker.stats.speed > defender.stats.speed ? 1.2 : 0.8;  // Agility-based bonus
  
    // Special moves: randomly trigger based on intelligence or special abilities
    const isCriticalHit = Math.random() < (attacker.stats.intelligence / 100);  // Higher intelligence, higher chance of critical hit
    const move = isCriticalHit ? 'Critical Hit' : 'Normal Attack';
  
    const damage = Math.max(attackStrength * agilityAdvantage - defense, 0);  // Calculate final damage
  
    return {
      move: move,
      damage: damage
    };
  }
  