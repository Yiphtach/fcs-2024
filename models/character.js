// models/character.js
const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  universe: { type: String, required: true },
  stats: {
    strength: { type: Number, required: true },
    speed: { type: Number, required: true },
    durability: { type: Number, required: true },
    power: { type: Number, required: true },
    combat: { type: Number, required: true },
    intelligence: { type: Number, required: true }
  },
  abilities: [String],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  totalFights: { type: Number, default: 0 }
});

module.exports = mongoose.model('Character', CharacterSchema);
