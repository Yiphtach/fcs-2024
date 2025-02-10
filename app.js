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


// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// MongoDB connection without
mongoose.connection.on("connected", () => {
  console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
});
mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});


// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logger for requests
app.use(methodOverride('_method')); // Support method override for PUT & DELETE
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Compress response bodies

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Routes
const characterRoutes = require('./backend/routes/charactersRoutes');
const fightRoutes = require('./backend/routes/fightsRoutes');
const leaderboardsRoutes = require('./backend/routes/leaderboardsRoutes');
const leaderboardRoutes = require('./backend/routes/leaderboardsRoutes');
const superheroAPIRoutes = require('./backend/routes/superheroAPI');

app.use('/api/characters', characterRoutes);
app.use('/api/fights', fightRoutes);
app.use('/api/leaderboards', leaderboardsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/superhero', superheroAPIRoutes);  // For Superhero API Fetching

// Root Route
app.get('/', (req, res) => {
    res.send('🔥 Superhero Fight Simulator API is running...');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));