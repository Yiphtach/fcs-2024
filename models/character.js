const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define character schema
const CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Character name is required'],
    trim: true
  },
  universe: {
    type: String,
    required: [true, 'Universe is required'],
    enum: [
      'DC', 
      'Marvel', 
      'Dark Horse Comics', 
      'Image Comics', 
      'Valiant Comics', 
      'NBC - Heroes',   // Add this value to allow NBC - Heroes
      'Other', 
      'Marvel Comics', 
      'DC Comics'
    ],  // Expanded valid universe options
    default: 'Other',
    validate: {
      validator: function (v) {
        return v !== undefined;
      },
      message: 'Universe cannot be undefined'
    }
  },
  stats: {
    strength: {
      type: Number,
      required: true,
      min: [0, 'Strength cannot be less than 0'],
      max: [100, 'Strength cannot exceed 100']
    },
    speed: {
      type: Number,
      required: true,
      min: [0, 'Speed cannot be less than 0'],
      max: [100, 'Speed cannot exceed 100']
    },
    durability: {
      type: Number,
      required: true,
      min: [0, 'Durability cannot be less than 0'],
      max: [100, 'Durability cannot exceed 100']
    },
    power: {
      type: Number,
      required: true,
      min: [0, 'Power cannot be less than 0'],
      max: [100, 'Power cannot exceed 100']
    },
    combat: {
      type: Number,
      required: true,
      min: [0, 'Combat cannot be less than 0'],
      max: [100, 'Combat cannot exceed 100']
    },
    intelligence: {
      type: Number,
      required: true,
      min: [0, 'Intelligence cannot be less than 0'],
      max: [100, 'Intelligence cannot exceed 100']
    }
  },
  abilities: {
    type: [Schema.Types.Mixed],  // This allows abilities to be strings or objects
    default: []
    // Example:
    // abilities: [{ name: 'Fly', powerLevel: 80, type: 'Offensive' }]
  },
  imageUrl: {
    type: String,
    default: 'https://example.com/default-image.jpg'  // Placeholder image URL
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  totalFights: {
    type: Number,
    default: function () {
      return this.wins + this.losses;  // Ensure totalFights is consistent
    }
  },
  lastFightDate: {
    type: Date
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Virtual property: win ratio
CharacterSchema.virtual('winRatio').get(function () {
  if (this.totalFights === 0) return 0;  // Avoid division by zero
  return (this.wins / this.totalFights).toFixed(2);
});

// Virtual property: loss ratio
CharacterSchema.virtual('lossRatio').get(function () {
  if (this.totalFights === 0) return 0;  // Avoid division by zero
  return (this.losses / this.totalFights).toFixed(2);
});

// Virtual property: average power level of abilities
CharacterSchema.virtual('averageAbilityPower').get(function () {
  if (!this.abilities.length) return 0;
  const totalPower = this.abilities.reduce((total, ability) => {
    return typeof ability === 'object' ? total + ability.powerLevel : total;  // Ensure only object abilities contribute
  }, 0);
  return (totalPower / this.abilities.length).toFixed(2);
});

// Pre-save hook to ensure totalFights is correct
CharacterSchema.pre('save', function (next) {
  this.totalFights = this.wins + this.losses;  // Ensure totalFights always equals wins + losses
  next();
});

// Middleware to automatically update the last fight date
CharacterSchema.methods.updateLastFightDate = async function () {
  this.lastFightDate = new Date();
  await this.save();
};

// Ensure virtual fields are included when converting to JSON or objects
CharacterSchema.set('toJSON', { virtuals: true });
CharacterSchema.set('toObject', { virtuals: true });

// Model and Export
module.exports = mongoose.model('Character', CharacterSchema);
