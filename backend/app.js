// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cron = require('node-cron');
const helmet = require('helmet'); // Added Helmet for security enhancements
const compression = require('compression'); // Added compression for better performance
const rateLimit = require('express-rate-limit'); // Added rate limiting for security
const dataImporter = require('./data/dataImporter'); // Import the data importer script

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// MongoDB connection without
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => {
    console.error(`Connection error: ${err}`);
    process.exit(1); // Exit the app if database connection fails
  });

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use Helmet for security headers
app.use(helmet());

// Use Compression for performance optimization
app.use(compression());

// Rate Limiting to avoid API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

// Method Override for PUT and DELETE requests via forms
app.use(methodOverride('_method'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes (import your routes as needed)
const indexRoutes = require('./routes/index');
const characterRoutes = require('./routes/characters');
const fightRoutes = require('./routes/fights');
const leaderboardsRoutes = require('./routes/leaderboards');

// Apply Routes
app.use('/', indexRoutes);
app.use('/characters', characterRoutes);
app.use('/fights', fightRoutes);
app.use('/leaderboards', leaderboardsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!'); // Graceful error handling
});

// Schedule a cron job to fetch data daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled character data import...');
  try {
    await dataImporter.fetchMultipleCharacters(); // Calls the function from your data importer script
    console.log('Data import successful');
  } catch (error) {
    console.error('Error during scheduled data import:', error);
  }
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const PORT = port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
