const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${mongoose.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
    console.log("🎯 MongoDB connected successfully.");
});
mongoose.connection.on("error", (err) => {
    console.log(`❗ MongoDB connection error: ${err}`);
});

module.exports = { connectDB };