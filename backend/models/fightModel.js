//Defines how fight history is stored in MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Fight Schema
const FightSchema = new Schema({
  character1: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  character2: { type: Schema.Types.ObjectId, ref: 'Character', required: true },

  character1Stats: {
    intelligence: Number,
    strength: Number,
    speed: Number,
    durability: Number,
    power: Number,
    combat: Number
  },

  character2Stats: {
    intelligence: Number,
    strength: Number,
    speed: Number,
    durability: Number,
    power: Number,
    combat: Number
  },

  totalRounds: { 
    type: Number, 
    required: true, 
    min: [1, 'A fight must have at least 1 round.']
  },

  winner: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  loser: { type: Schema.Types.ObjectId, ref: 'Character', required: true },

  winnerDamageDealt: { 
    type: Number, 
    required: true, 
    min: [0, 'Damage dealt cannot be negative.']
  },
  loserDamageDealt: { 
    type: Number, 
    required: true, 
    min: [0, 'Damage dealt cannot be negative.']
  },

  winnerSpecialMoveUsed: { type: String, default: '' },  
  loserSpecialMoveUsed: { type: String, default: '' },  

  winnerLuckFactor: { 
    type: Number, 
    default: 1, 
    min: [0, 'Luck factor cannot be negative.'], 
    max: [5, 'Luck factor cannot exceed 5.']
  },  
  loserLuckFactor: { 
    type: Number, 
    default: 1, 
    min: [0, 'Luck factor cannot be negative.'], 
    max: [5, 'Luck factor cannot exceed 5.']
  },  

  fightLog: { type: [String], required: true }, // Detailed round-by-round fight log

  fightSummary: { type: String, default: "Fight details not generated yet." },

  fightDate: { type: Date, default: Date.now }
});

// 🔹 Middleware Hook: Fetch Character Stats Before Saving
FightSchema.pre('save', async function (next) {
  try {
    const Character = mongoose.model('Character');
    
    // Fetch character data
    const char1 = await Character.findById(this.character1);
    const char2 = await Character.findById(this.character2);

    if (!char1 || !char2) {
      throw new Error("One or both characters not found.");
    }

    // Store fight stats
    this.character1Stats = char1.powerstats;
    this.character2Stats = char2.powerstats;

    next();
  } catch (error) {
    next(error);
  }
});

// 🔹 Pre-save Hook: Validate Fight Data Before Saving
FightSchema.pre('save', function (next) {
  if (this.winnerDamageDealt < 0 || this.loserDamageDealt < 0) {
    return next(new Error('Damage dealt must be non-negative.'));
  }

  if (this.totalRounds <= 0) {
    return next(new Error('Total rounds must be greater than zero.'));
  }

  next();
});

// 🔹 Indexes for Faster Queries
FightSchema.index({ winner: 1 });
FightSchema.index({ loser: 1 });

// Export the Model
module.exports = mongoose.model('Fight', FightSchema);
