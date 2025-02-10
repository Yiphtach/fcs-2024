const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define character schema
const CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Character name is required'],
    trim: true
  },
  alias: {
    type: [String],
    default: []
  },
  universe: {
    type: String,
    required: [true, 'Universe is required'],
    enum: [
      'DC', 'Marvel', 'Dark Horse Comics', 'Image Comics', 
      'Valiant Comics', 'NBC - Heroes', 'Other', 'Marvel Comics', 'DC Comics'
    ],
    default: 'Other',
    validate: {
      validator: function (v) {
        return v !== undefined;
      },
      message: 'Universe cannot be undefined'
    }
  },

  powerstats: {
    intelligence: { type: Number, required: true, min: 0, max: 500 },
    strength: { type: Number, required: true, min: 0, max: 500 },
    speed: { type: Number, required: true, min: 0, max: 500 },
    durability: { type: Number, required: true, min: 0, max: 500 },
    power: { type: Number, required: true, min: 0, max: 500 },
    combat: { type: Number, required: true, min: 0, max: 500 }
  },

  biography: {
    fullName: { type: String, default: "Unknown" },
    publisher: { type: String, default: "Unknown" },
    firstAppearance: { type: String, default: "Unknown" },
    placeOfBirth: { type: String, default: "Unknown" },
    alignment: { type: String, enum: ['good', 'neutral', 'bad'], default: "neutral" }
  },

  appearance: {
    gender: { type: String, default: "Unknown" },
    race: { type: String, default: "Unknown" },
    height: { type: [String], default: ["Unknown"] }, // [metric, imperial]
    weight: { type: [String], default: ["Unknown"] }, // [metric, imperial]
    eyeColor: { type: String, default: "Unknown" },
    hairColor: { type: String, default: "Unknown" }
  },

  work: {
    occupation: { type: String, default: "Unknown" },
    base: { type: String, default: "Unknown" }
  },

  connections: {
    groupAffiliation: { type: String, default: "None" },
    relatives: { type: String, default: "Unknown" }
  },

  image: {
    url: { type: String, default: "https://via.placeholder.com/150" }
  },

  // Fight Stats
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  totalFights: {
    type: Number,
    default: function () { return this.wins + this.losses; }
  },
  lastFightDate: { type: Date },

  // Abilities
  abilities: {
    type: [Schema.Types.Mixed], // Supports string or object format
    default: []
  },

  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// 🔹 Virtual Properties
// Win Ratio
CharacterSchema.virtual('winRatio').get(function () {
  if (this.totalFights === 0) return 0;
  return (this.wins / this.totalFights).toFixed(2);
});

// Loss Ratio
CharacterSchema.virtual('lossRatio').get(function () {
  if (this.totalFights === 0) return 0;
  return (this.losses / this.totalFights).toFixed(2);
});

// Average Ability Power
CharacterSchema.virtual('averageAbilityPower').get(function () {
  if (!this.abilities.length) return 0;
  const totalPower = this.abilities.reduce((total, ability) => {
    return typeof ability === 'object' ? total + ability.powerLevel : total;
  }, 0);
  return (totalPower / this.abilities.length).toFixed(2);
});

// 🔹 Middleware Hooks
// Pre-save hook to ensure `totalFights` is always updated
CharacterSchema.pre('save', function (next) {
  this.totalFights = this.wins + this.losses;
  next();
});

// Method: Update Last Fight Date
CharacterSchema.methods.updateLastFightDate = async function () {
  this.lastFightDate = new Date();
  await this.save();
};

// Ensure virtual fields are included in JSON & Objects
CharacterSchema.set('toJSON', { virtuals: true });
CharacterSchema.set('toObject', { virtuals: true });

// Export the model
module.exports = mongoose.model('Character', CharacterSchema);
