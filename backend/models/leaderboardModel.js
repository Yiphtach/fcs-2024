//Defines how leaderboard rankings are stored.
const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    lastPlayed: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


leaderboardSchema.index({ score: -1 });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;