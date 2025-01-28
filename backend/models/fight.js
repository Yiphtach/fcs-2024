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
    required: true,
    min: [1, 'A fight must have at least 1 round.']
  },  // Number of rounds fought
  winnerDamageDealt: { 
    type: Number, 
    required: true,
    min: [0, 'Damage dealt cannot be negative.']
  },  // Total damage dealt by the winner
  loserDamageDealt: { 
    type: Number, 
    required: true,
    min: [0, 'Damage dealt cannot be negative.']
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
    default: 1,
    min: [0, 'Luck factor cannot be negative.'],
    max: [5, 'Luck factor cannot exceed 5.']
  },  // Luck factor of the winner during the fight
  loserLuckFactor: { 
    type: Number, 
    default: 1,
    min: [0, 'Luck factor cannot be negative.'],
    max: [5, 'Luck factor cannot exceed 5.']
  },  // Luck factor of the loser during the fight
  date: { 
    type: Date, 
    default: Date.now 
  }  // Date of the fight
});

// Add indexes for faster querying by winner and loser
fightSchema.index({ winner: 1 });
fightSchema.index({ loser: 1 });

// Pre-save hook to validate fight data before saving
fightSchema.pre('save', function (next) {
  if (this.winnerDamageDealt < 0 || this.loserDamageDealt < 0) {
    return next(new Error('Damage dealt must be non-negative.'));
  }

  if (this.totalRounds <= 0) {
    return next(new Error('Total rounds must be greater than zero.'));
  }

  next();
});

// Create Fight model
const Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;