const mongoose = require('mongoose');

// Define character schema
const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Character name is required'],
    trim: true
  },
  universe: {
    type: String,
    required: [true, 'Universe is required'],
    enum: ['DC', 'Marvel', 'Other', 'Marvel Comics', 'DC Comics'],  // Added valid universe options
    default: 'Other'
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
  abilities: [{
    name: { type: String, required: true },
    type: { type: String, enum: ['Offensive', 'Defensive', 'Utility'], default: 'Utility' },
    powerLevel: { type: Number, min: 0, max: 100, required: true },
    description: { type: String }
  }],
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
    default: 0
  },
  lastFightDate: {
    type: Date
  }
});

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

// Middleware to automatically update the last fight date
CharacterSchema.methods.updateLastFightDate = async function () {
  this.lastFightDate = new Date();
  await this.save();
};

// Ensure virtual fields are included when converting to JSON or objects
CharacterSchema.set('toJSON', { virtuals: true });
CharacterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Character', CharacterSchema);
