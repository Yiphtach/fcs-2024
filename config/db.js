const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

// MongoDB connection
const connectDB = async () => {
  try {
    // Connecting to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    // MongoDB Connection Event Handlers
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established.');
    });

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB connection lost. Attempting to reconnect...');
      reconnectDB();
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB error: ${err}`);
    });

  } catch (err) {
    console.error(`Initial MongoDB Connection Error: ${err.message}`);
    process.exit(1);  // Exit process with failure
  }
};

// Reconnect Logic in case of disconnection
const reconnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Reconnected.');
  } catch (err) {
    console.error('MongoDB reconnection failed:', err);
    setTimeout(reconnectDB, 5000);  // Retry after 5 seconds
  }
};

module.exports = connectDB;
