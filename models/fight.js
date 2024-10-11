const mongoose = require('mongoose');

// Define fight schema with additional fields for expanded balancing
const fightSchema = new mongoose.Schema({
  winner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Character', 
    required: true 
  },
  loser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Character', 
    required: true 
  },
  fightLog: { 
    type: [String], 
    required: true 
  },
  totalRounds: { 
    type: Number, 
    required: true 
  },  // Number of rounds fought
  winnerDamageDealt: { 
    type: Number, 
    required: true 
  },  // Total damage dealt by the winner
  loserDamageDealt: { 
    type: Number, 
    required: true 
  },  // Total damage dealt by the loser
  winnerSpecialMoveUsed: { 
    type: String, 
    default: '' 
  },  // Special move used by the winner (if any)
  loserSpecialMoveUsed: { 
    type: String, 
    default: '' 
  },  // Special move used by the loser (if any)
  winnerLuckFactor: { 
    type: Number, 
    default: 1 
  },  // Luck factor of the winner during the fight
  loserLuckFactor: { 
    type: Number, 
    default: 1 
  },  // Luck factor of the loser during the fight
  date: { 
    type: Date, 
    default: Date.now 
  }  // Date of the fight
});

// Create Fight model
const Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;
