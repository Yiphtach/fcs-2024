const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fight = require('../models/fightModel');
const Character = require('../models/characterModel');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ Error:', err));

const createTestFight = async () => {
    try {
        const char1 = await Character.findOne({ name: "Superman" });
        const char2 = await Character.findOne({ name: "Batman" });

        if (!char1 || !char2) {
            console.log("❌ One or both test characters not found. Please add them first.");
            return;
        }

        const newFight = new Fight({
            character1: char1._id,
            character2: char2._id,
            rounds: 3,
            winner: char1._id,
            loser: char2._id,
            fightSummary: `${char1.name} overpowered ${char2.name} in 3 rounds!`
        });

        await newFight.save();
        console.log('✅ Fight saved successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error creating test fight:', error);
        mongoose.connection.close();
    }
};

createTestFight();
