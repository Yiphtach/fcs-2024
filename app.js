require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const cron = require('node-cron');
const helmet = require('helmet'); // Added Helmet for security enhancements
const compression = require('compression'); // Added compression for better performance
const rateLimit = require('express-rate-limit'); // Added rate limiting for security
const dataImporter = require('./backend/data/dataImporter'); // Import the data importer script

const { connectDB } = require ("./backend/config/db.js");
const Character = require('./backend/models/characterModel.js');
const Fights = require('./backend/models/fightModel');

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// MongoDB connection without
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => {
    console.error(`Connection error: ${err}`);
    process.exit(1); // Exit the app if database connection fails
  });

  console.log('MongoDB URI: ', process.env.MONGODB_URI);

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logger for requests
app.use(methodOverride('_method')); // Support method override for PUT & DELETE

// Routes
const charactersRoutes = require('./backend/routes/charactersRoutes.js');
const fightsRoutes = require('./backend/routes/fightsRoutes.js');
const leaderboardsRoutes = require('./backend/routes/leaderboardsRoutes');
const superheroAPIRoutes = require('./backend/routes/superheroAPI');

app.use('/api/charactersRoutes', charactersRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/fights', fightsRoutes);
app.use('/api/leaderboards', leaderboardsRoutes);
app.use('/api/superhero', superheroAPIRoutes);  // For Superhero API Fetching

// Root Route
app.get('/', (req, res) => {
    res.send('🔥 Superhero Fight Simulator API is running...');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






